<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const machines = writable([]);
  const apiUrl = 'http://127.0.0.1:5000/machines';

  const language = writable('en');

  const translations = {
    en: {
      title: 'Washing Machine Status',
      status: 'Status',
      info: 'The information here is of course not 100% reliable.',
      usageUntil: 'Usage Until',
      working: 'Working',
      broken: 'Broken',
      finished: 'Finished',
      alert: 'The selected time must be at least the current time.',
      createdBy: 'Created by Tom (E05)',
    },
    de: {
      title: 'Status der Waschmaschinenen',
      status: 'Status',
      info: 'Die Informationen hier sind natürlich nicht 100%ig zuverlässig.',
      usageUntil: 'Nutzung bis',
      working: 'Funktioniert',
      broken: 'Defekt',
      finished: 'Fertig',
      alert: 'Die ausgewählte Zeit muss mindestens die aktuelle Zeit sein.',
      createdBy: 'Erstellt von Tom (E05)',
    },
    ru: {
      title: 'Статус стиральной машины',
      status: 'Статус',
      info: 'Разумеется, информация здесь не является на 100% достоверной.',
      usageUntil: 'Использование до',
      working: 'Работает',
      broken: 'Неисправна',
      finished: 'Завершено',
      alert: 'Выбранное время должно быть минимум текущим временем.',
      createdBy: 'Создано Томом (E05)',
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
          usage_until: machine.usage_until
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

  function handleUsageUntilChange(machine, event) {
    const newTime = event.target.value;
    const currentTime = getCurrentTime();

    if (newTime >= currentTime) {
      machine.usage_until = newTime;
      updateMachine(machine);
    } else {
      alert(translations[$language].alert);
    }
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toISOString().slice(11, 16); // Returns HH:MM format in 24-hour time
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
        {translations[$language].usageUntil}:
        <input 
          type="time" 
          bind:value={machine.usage_until} 
          min={getCurrentTime()}
          on:change={(e) => handleUsageUntilChange(machine, e)} 
        />
      </label>
      <button on:click={() => { machine.usage_until = null; updateMachine(machine); }}>{translations[$language].finished}</button>
    </div>
    <p>{translations[$language].status}: {machine.status}</p>
    <p>{translations[$language].usageUntil}: {machine.usage_until ? machine.usage_until : 'Not in use'}</p>
  </div>
{/each}

<div>{translations[$language].createdBy}</div>
