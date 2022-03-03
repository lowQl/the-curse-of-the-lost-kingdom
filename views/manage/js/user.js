new Vue({
  el: '#app',
  data() {
    return {
      titleList: {
        insert: { title: '新增管理人員' },
        list: { title: '管理人員列表' },
      },
      userList: [],
      role: '',
      id: '',
      name: '',
      step: 'list',
    };
  },
  mounted() {
    axios.get('./users')
      .then((res) => {
        this.userList = res.data;
      }).catch((err) => {
        const res = err.response;
        const msg = res.data;
        alert(msg);
      });
  },
  computed: {
    title() {
      return this.titleList[this.step].title;
    },
  },
  methods: {
    redirect(url) {
      location.href = url;
    },
    insertHandler() {
      if (this.id === '' || this.role === '') return;
      const user = { id: this.id, role: this.role };
      axios.post('./user', user)
        .then((res) => {
          const msg = res.data;
          if (msg === 'success') {
            this.userList.push(user);
            alert('success');
          }
        }).catch((err) => {
          const res = err.response;
          if (!res) {
            alert('unKnow error.');
            return;
          } else if (res.status === 404) {
            this.redirect(res.redirect || '/');
            return;
          } else {
            alert(res.data);
          }
        });
    },
    deleteHandler(index) {
      if (!confirm('確認刪除，刪除後無法復原。')) return;
      axios.delete(`./user/${this.userList[index].id}`)
        .then((res) => {
          const msg = res.data;
          if (msg === 'success') {
            this.userList.splice(index, 1);
          }
        })
        .catch((err) => {
          const res = err.response;
          if (!res) {
            alert('unKnow error.');
            return;
          }
          if (res.status === 404) {
            this.redirect(res.redirect || '/');
            return;
          }
        });
    },
  },
});
