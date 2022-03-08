new Vue({
  el: '#app',
  data() {
    return {
      treasureList: {
        insert: { title: '新增寶物系統' },
        list: { title: '寶物列表' },
      },
      userList: [],
      treasureDate: {
        name: '',
        content: '',
        type: '主線',
      },
      step: localStorage.getItem('step') || 'list',
    };
  },
  mounted() {
    // axios.get('./users')
    //   .then((res) => {
    //     this.userList = res.data;
    //   }).catch((err) => {
    //     const res = err.response;
    //     const msg = res.data;
    //     alert(msg);
    //   });
  },
  computed: {
    title() {
      return this.treasureList[this.step].title;
    },
  },
  methods: {
    // redirect(url) {
    //   location.href = url;
    // },
    insertHandler() {
    },
    // deleteHandler(index) {
    //   if (!confirm('確認刪除，刪除後無法復原。')) return;
    //   axios.delete(`./user/${this.userList[index].id}`)
    //     .then((res) => {
    //       const msg = res.data;
    //       if (msg === 'success') {
    //         this.userList.splice(index, 1);
    //       }
    //     })
    //     .catch((err) => {
    //       const res = err.response;
    //       if (!res) {
    //         alert('unKnow error.');
    //         return;
    //       }
    //       if (res.status === 404) {
    //         this.redirect(res.redirect || '/');
    //         return;
    //       }
    //     });
    // },
  },
  watch: {
    step() {
      localStorage.setItem('step', this.step);
    },
  },
});
