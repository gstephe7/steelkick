<template>
  <div id="social">

    <h3>Connect with SteelKick</h3>

    <hr>

    <div around>
      <a href="mailto:gstephens@steelkick.com" target="_blank">
        <icon icon="envelope"></icon>
      </a>
      <a href="https://www.facebook.com/SteelKickLLC" target="_blank">
        <icon :icon="{ prefix: 'fab', iconName: 'facebook' }"></icon>
      </a>
      <a href="https://www.linkedin.com/company/steelkick" target="_blank">
        <icon :icon="{ prefix: 'fab', iconName: 'linkedin' }"></icon>
      </a>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';

  #social {
    padding: 5px 15px;
  }

  svg {
    opacity: .5;
    font-size: 24px;
  }

  svg:hover {
    color: $secondary;
  }
</style>
