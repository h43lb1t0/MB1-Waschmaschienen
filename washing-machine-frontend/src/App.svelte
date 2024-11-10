<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const machines = writable([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const isDev = import.meta.env.VITE_IS_DEV;

  const language = writable('en');

  const translations = {
    en: {
      title: 'Washing Machine Status',
      status: 'Status',
      info: 'The information here is of course not 100% reliable.',
      usageFor: 'Usage Duration (hours and minutes)',
      working: 'Working',
      broken: 'Broken',
      finished: 'Finished',
      alert: 'The duration must be greater than zero.',
      createdBy: 'Created by Tom (E05)',
      timeRemaining: 'Time Remaining',
      timeElapsed: 'Done since',
      doneAt: 'Will be done at',
    },
    de: {
      title: 'Status der Waschmaschinenen',
      status: 'Status',
      info: 'Die Informationen hier sind natürlich nicht 100%ig zuverlässig.',
      usageFor: 'Nutzungsdauer (Stunden und Minuten)',
      working: 'Funktioniert',
      broken: 'Defekt',
      finished: 'Fertig',
      alert: 'Die Dauer muss größer als null sein.',
      createdBy: 'Erstellt von Tom (E05)',
      timeRemaining: 'Verbleibende Zeit',
      timeElapsed: 'Fertig seit',
      doneAt: 'Fertig um',
    },
    ru: {
      title: 'Статус стиральной машины',
      status: 'Статус',
      info: 'Разумеется, информация здесь не является на 100% достоверной.',
      usageFor: 'Длительность использования (часы и минуты)',
      working: 'Работает',
      broken: 'Неисправна',
      finished: 'Завершено',
      alert: 'Длительность должна быть больше нуля.',
      createdBy: 'Создано Томом (E05)',
      timeRemaining: 'Осталось времени',
      timeElapsed: 'Выполнено с тех пор',
      doneAt: 'Будет готово в',
    },
  };

  onMount(async () => {
    await fetchMachines();
  });

  async function fetchMachines() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      machines.set(data);
    } catch (error) {
      console.error('Failed to fetch machines:', error);
      machines.set([]); // Set empty list if fetching fails
    }
  }

  async function updateMachine(machine) {
    try {
      const response = await fetch(`${apiUrl}/${machine.id}`, {
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

      await fetchMachines();
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
    if (hours === 0 && minutes === 0) {
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
  .no-arrows::-webkit-outer-spin-button,
  .no-arrows::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .no-arrows {
    -moz-appearance: textfield;
  }
</style>

<div class="min-h-screen bg-gray-900 text-white py-6">
  <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-md shadow-md">
    <div class="language-toggle mb-6 flex items-center">
      <label for="language" class="mr-3">Select Language:</label>
      <select id="language" class="border rounded-md p-2 bg-gray-700 text-white" bind:value={$language}>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="ru">Русский</option>
      </select>
    </div>

    <h1 class="text-2xl font-bold mb-4">{translations[$language].title}</h1>
    <p class="text-sm text-gray-400 mb-6">{translations[$language].info}</p>

    {#if isDev}
      <p class="text-sm text-red-500">API URL: {apiUrl}</p>
      <p class="text-sm text-red-500 mb-6">DEV MODE</p>
    {/if}

    {#if $machines.length === 0}
      <p class="text-gray-500">No machines available at the moment.</p>
    {/if}

    <div class="container grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each $machines as machine (machine.id)}
        <div class="bg-gray-700 p-4 rounded-md shadow border border-gray-600">
          <h2 class="text-xl font-semibold mb-2">{machine.name}</h2>
          <label class="block mb-2">
            <span class="text-sm font-medium">{translations[$language].status}:</span>
            <select
              class="border p-2 rounded-md w-full bg-gray-600 text-white" 
              bind:value={machine.status} 
              on:change={(e) => handleStatusChange(machine, e)}>
                <option value="working">{translations[$language].working}</option>
                <option value="broken">{translations[$language].broken}</option>
            </select>
          </label>
          <div class="mt-4">
            <label class="block mb-4">
              <span class="text-sm font-medium">{translations[$language].usageFor}:</span>
              <div class="flex items-center space-x-2 mt-2">
                <input 
                  type="number" 
                  min="0" 
                  max="4" 
                  placeholder="Hours (optional)" 
                  id="hours" 
                  class="no-arrows border p-2 rounded-md w-24 bg-gray-600 text-white" 
                  bind:value={machine.hours} 
                  on:keydown={enforceNumberInput}
                />
                <input 
                  type="number" 
                  min="0" 
                  max="59" 
                  placeholder="Minutes" 
                  id="minutes" 
                  class="no-arrows border p-2 rounded-md w-24 bg-gray-600 text-white" 
                  bind:value={machine.minutes} 
                  on:keydown={enforceNumberInput}
                />
                <button 
                  class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" 
                  on:click={() => handleUsageDurationChange(machine, parseInt(machine.hours), parseInt(machine.minutes))}
                >Set Duration</button>
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
            <button class="bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600" on:click={() => { machine.usage_until = null; machine.start_time = null; updateMachine(machine); }}>{translations[$language].finished}</button>
          {/if}
        </div>
      {/each}
    </div>

    <div class="mt-12">
      <p class="text-sm text-gray-500">{translations[$language].createdBy}</p>
      <hr class="my-6">
      <p class="text-gray-400 mb-4">Here you can enter which washing machines work and which do not. You can also specify until when your washing machine is running, so that nobody has to run to the cellar just to find no free washing machine. Everything is completely anonymous. The more of us who use this, the better.</p>
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
