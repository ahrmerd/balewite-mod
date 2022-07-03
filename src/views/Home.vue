<template>
  <div class="home">
    <router-link class="card" :to="{ name: 'Announcements' }">
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
        <path
          d="M36.5 25.5v-3H44v3ZM39 40l-6.05-4.5 1.8-2.4 6.05 4.5Zm-4.1-25.15-1.8-2.4L39 8l1.8 2.4ZM10.5 38v-8H7q-1.25 0-2.125-.875T4 27v-6q0-1.25.875-2.125T7 18h9l10-6v24l-10-6h-2.5v8ZM28 30.7V17.3q1.35 1.2 2.175 2.925Q31 21.95 31 24t-.825 3.775Q29.35 29.5 28 30.7ZM7 21v6h9.8l6.2 3.7V17.3L16.8 21Zm8 3Z" />
      </svg>
      <p>Announcements</p>
    </router-link>
    <router-link class="card" :to="{ name: 'Articles' }">
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
        <path
          d="M13.85 34.05H27.6v-3H13.85Zm0-8.55h20.3v-3h-20.3Zm0-8.55h20.3v-3h-20.3ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z" />
      </svg>
      <p>Articles</p>
    </router-link>
    <router-link class="card" :to="{ name: 'Courses' }">
      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
        <path
          d="M17.15 27H28.4v-3H17.15Zm0-4.5H36.9v-3H17.15Zm0-4.5H36.9v-3H17.15ZM13 38q-1.2 0-2.1-.9-.9-.9-.9-2.1V7q0-1.2.9-2.1.9-.9 2.1-.9h28q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h28V7H13v28Zm-6 9q-1.2 0-2.1-.9Q4 42.2 4 41V10h3v31h31v3Zm6-37v28V7Z" />
      </svg>
      <p>Courses</p>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (min-width: 600px) {}
}

.card {
  box-shadow: var(--box-neumorphic);
  min-height: 200px;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: var(--box-neumorphic-inset);
    transform: scale(1.01)
  }

  @media (min-width: 600px) {
    width: 45%;
  }
}
</style>