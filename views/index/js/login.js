new Vue({
  el: '#app',
  data() {
    return {
      titleList: [
        {title: '登入系統'},
        {title: '創建系統'},
      ],
      inputText: '',
      id: '',
      name: '',
      step: 0,
    };
  },
  computed: {
    title() {
      return this.titleList[this.step].title;
    },
  },
  methods: {
    loginHandler() {
      if (this.inputText === '') return;
      axios.post('/login', {text: this.inputText})
        .then((res) => {
          const msg = res.data;
          if (msg === 'success') history.go(0);
          else if (msg === 'continue') this.step = 1;
        }).catch((err) => {
          const msg = err.response.data;
          alert(msg);
        });
    },
    playHandler() {
      if (this.id === '' || this.name === '' || this.step === 1) return;
      axios.post('/team', {id: this.id, name: this.name})
        .then((res) => {
          const msg = res.data;
          if (msg === 'success') history.go(0);
        }).catch((err) => {
          const msg = err.response.data;
          alert(msg);
        });
    },
  },
});
