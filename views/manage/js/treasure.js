new Vue({
  el: '#app',
  data() {
    return {
      titleList: {
        insert: { title: '新增寶物系統' },
        list: { title: '寶物列表' },
      },
      treasureList: [],
      treasureDate: {
        name: '',
        content: '',
        type: '主線',
      },
      step: localStorage.getItem('step') || 'list',
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    title() {
      return this.titleList[this.step].title;
    },
  },
  methods: {
    init() {
      axios.get('./treasures')
        .then((res) => {
          this.treasureList = res.data;
        }).catch((err) => {
          const res = err.response;
          const msg = res.data;
          alert(msg);
        });
    },
    redirect(url) {
      location.href = url;
    },
    insertHandler() {
      for (const [key, val] of Object.entries(this.treasureDate)) {
        this.treasureDate[key] = this.treasureDate[key].trim();
        if (val === '') {
          console.log(`${key} 不能為空值`);
          break;
        }
      }
      axios.post(`./treasure`, this.treasureDate)
        .then((res) => {
          const msg = res.data;
          if (msg === 'success') {
            this.init();
            alert('新增成功。');
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
    infoOpen(index) {
      const modal = this.$refs.modal;
      modal.info = this.teamList[index];
      modal.isOpen = true;
    },
    deleteHandler(index) {
      if (!confirm('確認刪除，刪除後無法復原。')) return;
      axios.delete(`./treasure/${this.treasureList[index].id}`)
        .then((res) => {
          const msg = res.data;
          if (msg === 'success') {
            this.treasureList.splice(index, 1);
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
  watch: {
    step() {
      localStorage.setItem('step', this.step);
    },
  },
});
