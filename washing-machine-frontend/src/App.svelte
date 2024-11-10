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
    const usageDuration = ((hours || 0) * 60) + minutes;
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
</script>

<style>
  .machine {
    border: 1px solid #ccc;
    padding: 1em;
    margin-bottom: 1em;
  }

  .language-toggle {
    margin-bottom: 1em;
  }
</style>

<div class="language-toggle">
  <label for="language">Select Language:</label>
  <select id="language" bind:value={$language}>
    <option value="en">English</option>
    <option value="de">Deutsch</option>
    <option value="ru">Русский</option>
  </select>
</div>

<h1>{translations[$language].title}</h1>
<p>{translations[$language].info}</p>

{#if isDev}
  <p>API URL: {apiUrl}</p>
  <p>DEV MODE</p>
{/if}

{#if $machines.length === 0}
  <p>No machines available at the moment.</p>
{/if}

{#each $machines as machine (machine.id)}
  <div class="machine">
    <h2>{machine.name}</h2>
    <label>
      {translations[$language].status}:
      <select bind:value={machine.status} on:change={(e) => handleStatusChange(machine, e)}>
        <option value="working">{translations[$language].working}</option>
        <option value="broken">{translations[$language].broken}</option>
      </select>
    </label>
    <div>
      <label>
        {translations[$language].usageFor}:
        <input type="number" min="0" max="4" placeholder="Hours (optional)" id="hours" bind:value={machine.hours} />
        <input type="number" min="0" max="59" placeholder="Minutes" id="minutes" bind:value={machine.minutes} required />
        <button on:click={() => handleUsageDurationChange(machine, parseInt(machine.hours), parseInt(machine.minutes))}>Set Duration</button>
      </label>
    </div>
    {#if machine.usage_until}
      {#if getTimeDifference(machine.usage_until) > 0}
        <p>{translations[$language].timeRemaining}: {getTimeDifference(machine.usage_until)} minutes</p>
        <p>{translations[$language].doneAt}: {formatTime(machine.usage_until)}</p>
      {:else}
        <p>{translations[$language].timeElapsed}: {getTimeDifference(machine.usage_until)} minutes</p>
      {/if}
    {/if}
    <button on:click={() => { machine.usage_until = null; machine.start_time = null; updateMachine(machine); }}>{translations[$language].finished}</button>
  </div>
{/each}

<div>
  <p>{translations[$language].createdBy}</p>
  <hr>
  <p>Here you can enter which washing machines work and which do not. You can also specify until when your washing machine is running, so that nobody has to run to the cellar just to find no free washing machine. Everything is completely anonymous. The more of us who use this, the better.</p>
  <p>Source code: <a href="https://github.com/h43lb1t0/MB1-Waschmaschienen">Github</a></p> 
  <hr>
  <div>
    <h4>Impressum:</h4>
    <p>Tom Haelbich</p>
    <p>Marksburgstr. 1</p>
    <p>10318 Berlin</p>
  </div>
</div>
