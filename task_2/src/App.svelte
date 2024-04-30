<script>

  import { values } from './lib/store';
  import axios from 'axios';

  let api_data  = null;
  
  let value_1 = 0;
  let value_2 = 0;
  let money_1 = '';
  let money_2 = '';
  let values_array_for_select = [''];

  values.subscribe((value) => {
		values_array_for_select = value;
	});

  async function get(str='') {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/' + str);
      api_data = response.data.rates;
      console.log('data', api_data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  function handleChangeSelectOne() {
    get(money_1);
    if (money_1 && money_2 && api_data) {
      let ratio = api_data.money_2
      value_2 = value_1 * ratio;
    }
  }
  function handleChangeSelectSecond() {
    if (money_1 && money_2 && api_data ) {
      let ratio = api_data.money_2
      value_2 = value_1 * ratio || 0;
    }
  }
  function handleChangeNumberOne() {
    if (money_1 && money_2 && api_data) {
      let ratio = api_data[money_2]
      value_2 = value_1 * ratio;
    }
  }
  function handleChangeNumberSecond() {
    if (money_1 && money_2 && api_data ) {
      let ratio = api_data[money_2]
      value_1 = value_2 / ratio;
    }
  }
 
</script>

<main class="main">

  <a class="link" href="https://www.exchangerate-api.com" target="_blank">Курсы по API обменного курса</a>

  <div class="grid">   

    <label for="city-select">Из
      <select class="column" name="money_1" id="money_1" bind:value={money_1} on:change={handleChangeSelectOne}>
        <option value="">-- Выберите валюту --</option>
        {#each values_array_for_select as value}
          <option value={value.slice(0,3)}>{value}</option>
        {/each}
      </select>
    </label>

    <input type="number" min="0" bind:value={value_1} on:change={handleChangeNumberOne}>

    <label for="city-select">В
      <select class="column" name="money_2" id="money_2" bind:value={money_2} on:change={handleChangeSelectSecond}>
        <option value="">-- Выберите валюту --</option>
        {#each values_array_for_select as value}
          <option value={value.slice(0,3)}>{value}</option>
        {/each}
      </select>
    </label>
   
    <input type="number" min="0" bind:value={value_2} on:change={handleChangeNumberSecond}>

  </div>

</main>

<style>
  .link {
    position: absolute;
    bottom: 30px;
    left: 30px;
  }
  .grid {
    display: grid;
    grid: auto auto / 40vw 15vw;
    gap: 25px;
  }
  .column {
    width: 35vw;
  }
</style>
