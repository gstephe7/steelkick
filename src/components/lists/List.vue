<template>
  <div class="list">

    <!-- List Header -->
    <div v-if="showSearch"
         class="list-header"
         :class="{ showSearch : showSearch }">
      <SearchHeader @close="showSearch = false"
                    @input="searching">
      </SearchHeader>
    </div>

    <!-- List Actions -->
    <span class="list-actions">
      <span v-if="search" class="action">
        <Button text @click="showSearch = true">
          <icon icon="search" class="action"></icon>
        </Button>
      </span>
      <span v-if="$slots.asideContent" class="action mobile">
        <Button text @click="showSheet = !showSheet">
          <icon icon="filter" class="action"></icon>
        </Button>
      </span>
    </span>

    <!-- Main Content in List -->
    <div class="list-main">

      <div v-if="$slots.title" class="list-title">
        <slot name="title"></slot>
      </div>

      <div v-if="$slots.fab">
        <span class="fab">
          <slot name="fab"></slot>
        </span>
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
          <Button @click="showSheet = false" outline>
            <slot name="asideAction"></slot>
          </Button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    search: Boolean
  },
  data () {
    return {
      showSheet: false,
      showSearch: false
    }
  },
  methods: {
    searching (payload) {
      this.$emit('searching', payload)
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

  .list-actions {
    height: 56px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 12;
    @include align;
    @media screen and (min-width: 1000px) {
      padding-right: 16px;
    }
  }

  .action {
    color: $accent;
    font-size: 18px;
  }

  .list-main {
    @include grow;
    max-width: 600px;
    margin: 0 auto;
  }

  .toggle-filter {
    text-align: right;
  }

  .fab {
    position: fixed;
    z-index: 2;
    right: 16px;
    bottom: 16px;
    @media screen and (min-width: 1000px) {
      right: 305px;
    }
  }

  .list-title {
    padding: 0 16px 16px;
  }

  .content {
    padding: 0 16px;
  }

  .aside {
    z-index: 3;
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
    transition: 250ms all;
    @media screen and (max-width: 999px) {
      box-shadow: $box-shadow-light;
      position: fixed;
      padding-top: 80px;
      top: 0;
      right: 0;
      transform: translateX(300px);
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

  .show {
    @media screen and (max-width: 999px) {
      visibility: visible;
      transform: translateX(0px);
      transition: 250ms all;
    }
  }
</style>
