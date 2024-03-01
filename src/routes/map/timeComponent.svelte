<script>
  let tempsTrajet = 0;
  let tempsRecharge = 0;
  let tempsTotal = 0;
  let affiche = false;

  export const afficherTempsTotal = (nouveauTempsTrajet, nouveauTempsRecharge, nouveauTempsTotal) => {
    tempsTrajet = nouveauTempsTrajet;
    tempsRecharge = nouveauTempsRecharge;
    tempsTotal = nouveauTempsTotal;
    affiche = true;
  };
</script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

{#if affiche}
<div class="time-component">
  <div class="info-box">
    <i class="material-icons">directions_car</i>
    <p>{tempsTrajet} h</p>
  </div>

  <div class="info-box">
    <i class="material-icons">battery_charging_full</i>
    <p>{tempsRecharge} h</p>
  </div>

  <div class="info-box">
    <i class="material-icons">timer</i>
    <p>{tempsTotal} h</p>
  </div>
</div>
{/if}

<style>
  .time-component {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }

  .info-box {
    display: flex;
    align-items: center;
    color: #000000;
  }

  i {
    margin-right: 5px;
  }
</style>
