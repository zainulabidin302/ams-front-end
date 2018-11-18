<template>
  <div class="container">
    <div class="course" v-for="(course, courseIndex) in courses">
     
  </div>
</template>

<script>
import data from '../data/data.js'
import moment from 'moment'
export default {
  name: 'Courses',
  methods: {
    isSelected(courseIndex) {
      return this.selectedCourse === courseIndex
    },
    createdAt(a) {
      
      return 'Published: ' + moment(new Date(a)).fromNow()
    },
    updatedAt(a, b) {
      if (a == b) {
        return ''
      } else {
        return 'Last Modified: ' + moment(new Date(b)).fromNow()
      }

    }
  },
  data () {
    return {
      selectedCourse: -1,
      courses: data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin: 0;
  padding: 0;
  line-height: 20 px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
  width: 80%;
  margin: auto;
}
.course {
border: 1px solid black;
text-align: left;
padding: 10px;
}
.assignment {
border: 1px solid black;
text-align: left;
padding: 10px;

}
</style>
