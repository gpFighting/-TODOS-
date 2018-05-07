Page({
  data: {
    input: '',
    todos: [
      // {todo: 'Learning Javascript', completed: false},
      // {todo: 'Learning Html', completed: true},
      // {todo: 'Learning Webpack', completed: false}
    ],
    flag: false,           //toggleAll 的标识
    lefttodo: 0             //剩余未完成的TODO数
  },
  onLoad(){
    wx.getStorage({
      key: "key",
      success: res=>{
        this.data = res.data
        console.log(this.data)
      },
      fail: a=>{       
        this.data = this.data
        console.log(this.data)
      }
    })
  },
  onReady(){
    this.setData({
      todos: this.data.todos,
      lefttodo: this.data.lefttodo
    })
  },
  inputTodos(e){            //将数据同步到界面上
    var todo = e.detail.value;
    this.setData({
      input: todo
    })
  },
  addToTodos(){                  //点击+或者完成按钮添加到TODOs 中
    if (!this.data.input) return;                 
    this.data.todos.push({todo: this.data.input, completed: false});   //用户输入信息同步到逻辑层
    this.data.lefttodo += 1;
    this.setData({
      todos: this.data.todos,
      input: '',
      lefttodo: this.data.lefttodo
    });
    wx.setStorage({key: 'key', data: this.data})
  },
  toggleState(e){
    // console.log(e.currentTarget)
    var index = e.currentTarget.dataset.index;
    this.data.todos[index].completed = !this.data.todos[index].completed;
    this.data.lefttodo += this.data.todos[index].completed ? -1 : 1 
    this.setData({
      todos: this.data.todos,
      lefttodo: this.data.lefttodo
    })
    wx.setStorage({key: 'key', data: this.data})
  },
  removetodo(e){
    var index = e.currentTarget.dataset.index;
    var item = this.data.todos.splice(index, 1)[0];  //数组的splice方法返回的是被删除的元素组成的数组
    this.data.lefttodo += item.completed ? 0 : -1;
    this.setData({
      todos: this.data.todos,
      lefttodo: this.data.lefttodo
    })
    wx.setStorage({key: 'key', data: this.data})
  },
  toggleAll(){
    this.data.flag = !this.data.flag;
    this.data.todos.forEach(item=>{
      item.completed = this.data.flag
    });
    this.data.lefttodo = this.data.flag ? 0 : this.data.todos.length;
    this.setData({
      todos: this.data.todos,
      lefttodo: this.data.lefttodo
    })
    wx.setStorage({key: 'key', data: this.data})
  },
  clearAll(){
    this.data.todos = this.data.todos.filter(item=>{
      return !item.completed
    })
    this.setData({
      todos: this.data.todos
    })
    wx.setStorage({key: 'key', data: this.data})
  }
})