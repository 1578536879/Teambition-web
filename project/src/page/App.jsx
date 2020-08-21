import React, {Component} from 'react';
import {Popover, List, Space, Input} from 'antd'
import {PlusCircleFilled, CloseOutlined, EditOutlined, BulbFilled, CheckOutlined, LineOutlined} from '@ant-design/icons'
import './App.css';
import EditTag from '../component/editTag';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tagsData: [{
        name: '测试',
        state: false,
        color: '#1E90FF',
        id: '121234'
      }],
      tags: [],
      deleteStyle: {
        display: 'inline'
      },
      tagName: ''
    }
  }

  deleteTag(e){
    console.log(e)
    let data = this.state.tagsData
    data = data.splice(1, e)
    console.log(data)
    this.setState({
      tags: data
    })
  }



  componentDidMount(){
    let data = []
    this.state.tagsData.forEach((element, index) => {
      data.push(
        <div className='tag' onMouseOver={this.mouseUp} onMouseLeave={this.onMouseLeave} style={{background: element.color}}>
          {element.name}&nbsp;&nbsp;
          <span onClick={this.deleteTag.bind(this, index)} ><CloseOutlined /></span>
        </div>)
    });
    let pdata = <EditTag/>
    this.setState({
      tags: data,
      content: pdata
    })
  }

  edit = (e) => {
    console.log(e)
  }

  check = (e) => {
    console.log(e)
  }

  add = (e) => {
    console.log(e)
  }

  addTag(){

  }

  tagChange = (e) => {
    let name = this.tagName.state.value || this.tagName.value
    let tag = this.state.tagsData.filter(ele=>{
      return ele.name = name
    })
    if(tag.length === 0){

    }
  }

  render(){
    return (
      <div className="App">
        {this.state.tags.length === 0 && <span className='add-tag'>添加标签</span>}

        {this.state.tags}
        
        {this.state.tags.length !== 0 && 
        <Popover content={this.state.content} trigger="click">
            <PlusCircleFilled style={{color: '#D3D3D3'}}/>
        </Popover> }
      </div>
    );
  }
  
}

export default App;
