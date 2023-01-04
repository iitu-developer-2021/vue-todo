<template>
  <div class="standard-layout">
    <div class="standard-layout__wrapper">
      <aside class="standard-layout__aside">
        <slot name="aside" />
      </aside>
      <main class="standard-layout__main">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
<style lang="scss">
.standard-layout {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin-top: 50px;

  &__wrapper {
    flex: 0 1 950px;
    height: 80%;
    min-height: 550px;
    padding: 0 15px;
    display: flex;
    overflow: auto;
  }

  &__aside {
    flex: 0 0 250px;
  }

  &__main {
    flex: 1;
  }
}
</style>
