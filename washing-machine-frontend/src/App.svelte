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
  
  

  let socket;

  onMount(() => {
    // Connect to Socket.IO
    socket = io(apiUrl);


    // Fetch initial machine data
    fetchMachines();

    // Listen for real-time updates from the server
    socket.on('machine_update', (updatedMachine) => {
      machines.update((currentMachines) => {
        return currentMachines.map((machine) => 
          machine.id === updatedMachine.id ? { ...machine, ...updatedMachine } : machine
        );
      });
    });

    return () => {
      // Clean up socket connection when the component is destroyed
      if (socket) {
        socket.disconnect();
      }
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
          start_time: machine.start_time
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
    const diffMinutes = Math.floor(diffMs / 60000);
    return diffMinutes;
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function enforceNumberInput(event) {
    const key = event.key;
    if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      event.preventDefault();
    }
  }
</script>

<style>
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
          <div class="mt-4">
            <label class="block mb-4">
              <span class="text-sm font-medium">{translations[$language].usageFor}:</span>
              <div class="time-input-container">
                <input 
                  type="number" 
                  min="0" 
                  max="4" 
                  placeholder={translations[$language].hoursPlaceholder}
                  id="hours" 
                  class="time-input" 
                  bind:value={machine.hours} 
                  on:keydown={enforceNumberInput}
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
                />
                <button 
                  class="set-duration-button" 
                  on:click={() => handleUsageDurationChange(machine, parseInt(machine.hours), parseInt(machine.minutes))}
                >{translations[$language].setDuration}</button>
              </div>
            </label>
          </div>
          {#if machine.usage_until}
            <div class="mt-4">
              {#if getTimeDifference(machine.usage_until) > 0}
                <p class="text-sm text-green-400">{translations[$language].timeRemaining}: {getTimeDifference(machine.usage_until)} minutes</p>
                <p class="text-sm text-green-400">{translations[$language].doneAt}: {formatTime(machine.usage_until)}</p>
              {:else}
                <p class="text-sm text-red-400">{translations[$language].timeElapsed}: {getTimeDifference(machine.usage_until)} minutes</p>
              {/if}
            </div>
            <button class="done-button" on:click={() => { machine.usage_until = null; machine.start_time = null; updateMachine(machine); }}>{translations[$language].finished}</button>
          {/if}
        </div>
      {/each}
    </div>

    <div class="mt-12">
      <p class="text-sm text-gray-500">{translations[$language].createdBy}</p>
      <hr class="my-6">
      <p class="text-gray-400 mb-4">{translations[$language].about}</p>
      <p class="text-blue-400"><a href="https://github.com/h43lb1t0/MB1-Waschmaschienen" target="_blank" class="hover:underline">Source code: Github</a></p>
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
