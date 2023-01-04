<template>
  <div class="add-task">
    <button class="add-task__btn">
      <BaseSvgIcon name="plus" width="10px" height="10px" color="#868686" />
      <span>Добавить папку</span>
    </button>
  </div>
</template>
<script lang="ts"></script>
<style lang="scss" scoped>
.add-task {
  cursor: pointer;

  &__btn {
    border: none;
    outline: none;
    background: transparent;
    display: flex;
    padding: 12px;
    align-items: center;
    transition: 0.3s all;
    cursor: pointer;
    width: 100%;

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.15px;
      color: $taskItemAddBtnColor;
      margin-left: 10px;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
      background: #fff;
      border-radius: 3px;
    }
  }
}
</style>
