<script lang="ts">
  import Logo from "../images/Logo.svelte";

    let data = [
    { id: 1, name: "John", points: 20 },
    { id: 2, name: "Jane", points: 25 },
    { id: 3, name: "Bob", points: 15 },
    { id: 4, name: "Bob", points: 10 },
    { id: 5, name: "Bob", points: 5 },
  ];

   function calculatePointBarWidth(points) {
    return (points / 25) * 100 + '%';
  }
</script>

<div class="flex justify-center">
  <Logo />

</div>



<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    {#each data as item (item.id)}
      <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
          <div class="point-bar" style="width: {calculatePointBarWidth(item.points)}"></div>
          {item.points}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  /* You can add CSS styles for your table here */
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  .point-bar {
    height: 10px;
    background-color: #007bff; 
  }
</style>
