<script >
export default{
  name: 'Loading',

}

</script>

<template>
  <div class = "loading">
    <img src="@/assets/images/blogitLogo.png" alt="Logo" class="logo"/>
  </div>

</template>

<style scoped lang="scss">
@keyframes spin{
  to{
    transform: rotate(360deg);
  }
}

.loading{
  top: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;


  .logo{
    width: 200px;
    height: 200px;
    animation: spin ease 1000ms infinite;
  }
  @media (max-width: 768px) {
    .logo{
      width: 100px;
      height: 100px;
    }
  }
  @media (max-width: 480px) {
    .logo{
      width: 80px;
      height: 80px;
    }
  }

}

</style>