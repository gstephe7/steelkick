<template>
  <div main>

    <h1>Company Settings</h1>

    <hr>

    <div center wrap>

      <section col center card click @click="$router.push({name: 'Workflow'})">
        <icon big class="purple" icon="project-diagram"></icon>
        <h2>Configure Workflow</h2>
      </section>

    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  section[card] {
    height: 230px;
    width: 230px;
    h2 {
      margin-bottom: 0;
    }
  }
</style>
