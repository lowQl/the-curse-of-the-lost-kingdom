new Vue({
  el: '#app',
  data() {
    return {
      titleList: {
        insert: {title: '新增隊伍'},
        list: {title: '隊伍列表'},
      },
      teamList: [],
      id: '',
      step: 'list',
    };
  },
  mounted() {
    axios.get('./teams')
      .then((res) => {
        this.teamList = res.data;
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
      const team = {id: this.id, role: this.role};
      axios.post('./team', team)
        .then((res) => {
          const msg = res.data;
          if (msg === 'success') {
            this.teamList.push(team);
            alert('success');
          }
        }).catch((err) => {
          const res = err.response;
          if (res.status === 404) {
            if (res.redirect) {
              location.href = res.redirect;
              return;
            }
            location.href = '/';
            return;
          }
          const msg = res.data;
          alert(msg);
        });
    },
    deleteHandler(index) {
      if (!confirm('確認刪除，刪除後無法復原。')) return;
      axios.delete(`./team/${this.teamList[index].id}`)
        .then((res) => {
          const msg = res.data;
          if (msg === 'success') {
            this.teamList.splice(index, 1);
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
