<template>
  <div>
    <router-link to="/"> View course listing</router-link>
    <create-course></create-course>
  </div>
</template>
<script>
import CreateCourse from "../partials/course/CreateCourse";
export default {
  components: { CreateCourse }
};
</script>

