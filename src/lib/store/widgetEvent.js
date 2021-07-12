const store = {
  state: () => ({}),
  mutations: {
    save(state, obj) {
      state[obj.topic] = obj.payload
    }
  }
}

export default store
