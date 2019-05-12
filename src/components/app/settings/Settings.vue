<template>
  <div main>

    <div center wrap>

      <section col center card click @click="$router.push('/edit-profile')">
        <div half>
          <icon medium class="royal" icon="user-edit"></icon>
        </div>
        <div grow col>
          <b>Edit Profile</b>
          <small>Edit your user information</small>
        </div>
      </section>
      <section col center card click @click="$router.push('/workflow')">
        <div half>
          <icon medium class="purple" icon="project-diagram"></icon>
        </div>
        <div grow col>
          <b>Edit Workflow</b>
          <small>Setup your company's workflow</small>
        </div>
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
    height: 110px;
    width: 110px;
  }
</style>
