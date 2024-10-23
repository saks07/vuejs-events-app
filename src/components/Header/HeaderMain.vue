<template>
  <header class="container header">
    <div class="wrapper">
      <h1>
        <RouterLink :to="{ name: 'HomeView' }" class="logo">
          events app
        </RouterLink>
      </h1>
    </div>
  </header>
</template>

<style scoped>
.header {
  color: var(--color-white);
  padding: 2rem;
  background-color: var(--primary-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.logo {
  color: var(--color-white);
  text-transform: uppercase;
  text-decoration: none;
}
</style>
