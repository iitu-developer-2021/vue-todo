<template>
  <div class="standard-layout">
    <div class="standard-layout__wrapper">
      <div class="standard-layout__content">
        <aside class="standard-layout__aside">
          <slot name="aside" />
        </aside>
        <main class="standard-layout__main">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.standard-layout {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 50px);
  margin-top: 50px;

  &__wrapper {
    padding: 0 15px;
    flex: 0 1 950px;
  }

  &__content {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 5px;
    height: 80%;
    min-height: 550px;
    display: flex;
  }

  &__aside {
    width: 250px;
  }

  &__main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
