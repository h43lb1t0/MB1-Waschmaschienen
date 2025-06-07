<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { io } from 'socket.io-client';
  import translations from './i18n/translations.js';

  const machines = writable([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const isDev = import.meta.env.VITE_IS_DEV === 'true';

  const initialLanguage = localStorage.getItem('preferredLanguage') || 'en';
  const language = writable(initialLanguage);

  const knowsHowToUseWebsite = Boolean(localStorage.getItem('knowsHowToUseWebsite')) || false;
  
  let socket;

  onMount(() => {
    socket = io(apiUrl);

    fetchMachines();

    if (!knowsHowToUseWebsite) {
      alert("How do I use this website?\n\nSpecify for the corresponding washing machine how long you will use it. Provide this in hours and minutes. When you are finished with the laundry, please press the 'Done' button so that everyone knows that the washing machine is truly available again.");
      localStorage.setItem('knowsHowToUseWebsite', String(true));
    }

    // Listen for real-time updates from the server
    socket.on('machine_update', (updatedMachine) => {
      machines.update((currentMachines) => {
        return currentMachines.map((machine) => 
          machine.id === updatedMachine.id ? { 
            ...machine, 
            ...updatedMachine,
            last_state_change: updatedMachine.last_state_change || new Date().toISOString()
          } : machine
        );
      });
    });

    const interval = setInterval(() => {
      machines.update((currentMachines) => {
        return currentMachines.map((machine) => {
          if (machine.usage_until) {
            const timeDifference = getTimeDifference(machine.usage_until);
            return { ...machine, timeRemaining: timeDifference };
          }
          return machine;
        });
      });
    }, 30000); // Update every half minute

    return () => {
      if (socket) {
        socket.disconnect();
      }
      clearInterval(interval);
    };
  });

  language.subscribe((value) => {
    localStorage.setItem('preferredLanguage', value);
  });

  async function fetchMachines() {
    try {
      const response = await fetch(apiUrl+'/machines');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      machines.set(data);
    } catch (error) {
      console.error('Failed to fetch machines:', error);
      machines.set([]);
    }
  }

  async function updateMachine(machine) {
    try {
      const response = await fetch(`${apiUrl}/machines/${machine.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: machine.status,
          usage_until: machine.usage_until,
          start_time: machine.start_time,
          last_state_change: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update machine');
      }

      // The server will send a socket event, so no need to manually fetch machines
    } catch (error) {
      console.error('Failed to update machine:', error);
    }
  }

  function handleStatusChange(machine, event) {
    machine.status = event.target.value;
    updateMachine(machine);
  }

  function handleUsageDurationChange(machine, hours, minutes) {
    const usageDuration = ((hours || 0) * 60) + (minutes || 0);
    if ((hours === 0 && minutes === 0) || minutes >= 60) {
      alert(translations[$language].alert);
      return;
    }
    if (usageDuration > 0) {
      const startTime = new Date();
      const usageUntil = new Date(startTime.getTime() + usageDuration * 60000);
      machine.start_time = startTime.toISOString();
      machine.usage_until = usageUntil.toISOString();
      updateMachine(machine);
    } else {
      alert(translations[$language].alert);
    }
  }

  function getTimeDifference(endTime) {
    const now = new Date();
    const end = new Date(endTime);
    const diffMs = end - now;
    const diffMinutes = Math.ceil(diffMs / 60000);
    return diffMinutes;
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function enforceNumberInput(event) {
    const key = event.key;
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      event.preventDefault();
    }
  }
</script>

<style>
  /* Optional styling for disabled inputs */
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Ensure the set duration button has no hover effects when disabled */
  .set-duration-button:disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
  .set-duration-button:disabled:hover {
    background-color: inherit;
  }
</style>

<div class="min-h-screen bg-gray-900 text-white py-6">
  <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-md shadow-md">
    <div class="language-toggle">
      <label for="language" class="language-label">{translations[$language].selectLanguage}</label>
      <select id="language" class="language-select" bind:value={$language}>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="ru">Русский</option>
      </select>
    </div>

    <h1 class="h1">{translations[$language].title}</h1>
    <p class="info">{translations[$language].info}</p>

    {#if isDev}
      <p class="dev">{translations[$language].apiUrl}: {apiUrl}</p>
      <p class="dev">{translations[$language].devMode}</p>
    {/if}

    {#if $machines.length === 0}
      <p class="text-gray-500">{translations[$language].noMachines}</p>
    {/if}

    <div class="container">
      {#each $machines as machine (machine.id)}
        <div class="machine">
          <h2 class="h2">{machine.name}</h2>
          <div class="mt-4">
            <label class="block mb-2">
              <span class="text-sm font-medium">{translations[$language].status}:</span>
              <select
                class="state-select" 
                bind:value={machine.status} 
                on:change={(e) => handleStatusChange(machine, e)}>
                  <option value="working">{translations[$language].working}</option>
                  <option value="broken">{translations[$language].broken}</option>
              </select>
            </label>
            {#if machine.last_state_change}
              <p class="text-sm text-gray-400 mt-1">
                {translations[$language].lastStateChange}: {formatTime(machine.last_state_change)}
              </p>
            {/if}
          </div>
          <div class="mt-4">
            <label class="block mb-4">
              <span class="text-sm font-medium">{translations[$language].usageFor}:</span>
              <div class="time-input-container" class:opacity-50={machine.status === 'broken'}>
                <input 
                  type="number" 
                  min="0" 
                  max="4" 
                  placeholder={translations[$language].hoursPlaceholder}
                  id="hours" 
                  class="time-input" 
                  bind:value={machine.hours} 
                  on:keydown={enforceNumberInput}
                  disabled={machine.status === 'broken'}
                />
                <input 
                  type="number" 
                  min="0" 
                  max="59" 
                  placeholder={translations[$language].minutesPlaceholder}
                  id="minutes" 
                  class="time-input" 
                  bind:value={machine.minutes} 
                  on:keydown={enforceNumberInput}
                  disabled={machine.status === 'broken'}
                />
                <button 
                  class="set-duration-button" 
                  on:click={() => handleUsageDurationChange(machine, parseInt(machine.hours), parseInt(machine.minutes))}
                  disabled={machine.status === 'broken'}
                >
                  {translations[$language].setDuration}
                </button>
              </div>
            </label>
          </div>
          {#if machine.usage_until}
            <div class="mt-4">
              {#if getTimeDifference(machine.usage_until) > 0}
                <p class="text-sm text-green-400">
                  {translations[$language].timeRemaining}: {getTimeDifference(machine.usage_until)} minutes
                </p>
                <p class="text-sm text-green-400">
                  {translations[$language].doneAt}: {formatTime(machine.usage_until)}
                </p>
              {:else}
                <p class="text-sm text-red-400">
                  {translations[$language].timeElapsed}: {getTimeDifference(machine.usage_until)} minutes
                </p>
              {/if}
            </div>
            <button
              class="done-button" 
              on:click={() => {
                 machine.usage_until = null; 
                 machine.start_time = null; 
                 updateMachine(machine); }
                }
                >
                 {translations[$language].finished}
                </button>
          {/if}
        </div>
      {/each}
    </div>

    <div class="mt-12">
      <p class="text-sm text-gray-500">{translations[$language].createdBy}</p>
      <hr class="my-6">
      <p class="text-gray-400 mb-4">{translations[$language].about}</p>
      <p class="text-blue-400">
         <a
          href="https://github.com/h43lb1t0/MB1-Waschmaschienen" 
          target="_blank" 
          class="hover:underline">
            Source code: Github
        </a>
      </p>
      <hr class="my-6">
      <div>
        <h4 class="text-lg font-semibold mb-2">Impressum:</h4>
        <p class="text-sm">Tom Haelbich</p>
        <p class="text-sm">Marksburgstr. 1</p>
        <p class="text-sm">10318 Berlin</p>
      </div>
    </div>
  </div>
</div>
