<template>
  <div class="list">

    <!-- Main Content in List -->
    <div class="list-main">

      <div v-if="$slots.title" class="list-title">
        <slot name="title"></slot>
      </div>

      <div v-if="$slots.actions" class="actions">
        <slot name="actions"></slot>
      </div>

      <div v-if="$slots.asideContent" class="mobile">
        <div class="last">
          <Button text @click="showSheet = true">
            Show Filter &nbsp;
            <icon icon="angle-right"></icon>
          </Button>
        </div>
      </div>

      <div class="content">
        <slot name="content"></slot>
      </div>

    </div>

    <!-- Aside sheet filter -->
    <div v-if="$slots.asideContent"
         class="aside"
         :class="{ show : showSheet }"
         @click="showSheet = false">
      <div class="sheet"
           :class="{ show : showSheet }"
           @click.stop>

        <div class="sheet-header">
          <div class="sheet-title">
            <slot name="asideTitle"></slot>
          </div>
          <Button @click="showSheet = false" text>
            <icon class="icon" icon="times"></icon>
          </Button>
        </div>

        <div class="sheet-content">
          <slot name="asideContent"></slot>
        </div>

        <div class="col">
          <Button @click="showSheet = false" text>
            <slot name="asideAction"></slot>
          </Button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      showSheet: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .list {
    @include row;
    position: relative;
  }

  .list-main {
    @include grow;
    max-width: 600px;
    margin: 0 auto;
  }

  .actions {
    @include around;
    @include wrap;
  }

  .toggle-filter {
    text-align: right;
  }

  .list-title {
    padding: 0 16px 16px;
  }

  .content {
    padding: 0 16px;
  }

  .aside {
    @media screen and (max-width: 999px) {
      visibility: hidden;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.75);
    }
    @media screen and (min-width: 1000px) {
      min-height: 100vh;
      visibility: visible;
    }
  }

  .sheet {
    border-left: 1px solid $accent;
    background-color: #fff;
    width: 288px;
    height: 100%;
    @media screen and (max-width: 999px) {
      box-shadow: $box-shadow-light;
      position: fixed;
      padding-top: 80px;
      top: 0;
      right: 0;
      transform: translateX(300px);
    }
  }

  .show {
    @media screen and (max-width: 999px) {
      visibility: visible;
      transform: translateX(0px);
      transition: 250ms all;
    }
  }

  .sheet-header {
    @include align;
    @include between;
    font-size: 20px;
    margin-bottom: 16px;
    .sheet-title {
      padding: 0 16px;
    }
    .icon {
      font-size: 20px;
      color: rgba(0,0,0,.35);
      @media screen and (min-width: 1000px) {
        display: none;
      }
    }
  }

  .sheet-content {
    padding: 0 16px;
  }
</style>
