<template>
  <span col center class="progress-container" :class="{ details : details, edit : edit, list : list }">
    <span class="progress-bar" :style="{ width: percentComplete + '%' }" :class="color"></span>
    <span v-if="details">
      <img :src="require(`@/assets/img/actions/${action.description}.png`)"/>
    </span>
    <span v-if="!edit">
      {{ action.completed }}/{{ action.total }}
    </span>
    <span>
      {{ action.description }}
    </span>
  </span>
</template>

<script>
export default {
  props: ['action', 'details', 'edit', 'list'],
  computed: {
    percentComplete () {
      let percent = this.action.completed / this.action.total
      return percent * 100
    },
    color () {
      if (this.percentComplete < 50 && this.percentComplete > 0) {
        return 'orange'
      } else if (this.percentComplete >= 50 && this.percentComplete < 100) {
        return 'yellow'
      } else if (this.percentComplete == 100) {
        return 'green'
      } else {
        return 'red'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .progress-container {
    min-width: 70px;
    max-width: 100px;
    height: 35px;
    position: relative;
    border: 1px solid $accent;
    margin: 1px;
    font-size: 14px;
  }

  .details {
    min-width: 90px;
    max-width: 120px;
    height: 80px;
    flex-grow: 1;
    img {
      width: 30px;
    }
  }

  .edit {
    height: 60px;
  }

  .list {
    font-size: 12px;
    height: 28px;
    min-width: 50px;
    max-width: 50px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    opacity: .3;
    position: absolute;
    left: 0;
    transition: 500ms all;
  }

  .red {
    background-color: firebrick;
    border: 1px solid firebrick;
  }

  .orange {
    background-color: orange;
  }

  .yellow {
    background-color: yellow;
  }

  .green {
    background-color: limegreen;
  }
</style>
