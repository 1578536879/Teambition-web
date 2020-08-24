import React, {Component} from 'react';
import {Popover, message} from 'antd'
import {PlusCircleFilled, CloseCircleOutlined, } from '@ant-design/icons'
import './App.css';
import EditTag from '../component/editTag';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tags: [],
      deleteStyle: {
        display: 'inline'
      },
      tagName: '',
      visible: false,
      onIndex: -1
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.addTag = this.addTag.bind(this)
    this.modify = this.modify.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.chooseTag = this.chooseTag.bind(this)
    this.deleteTag = this.deleteTag.bind(this)
  }

  open(){
    this.setState({
      visible: true,
      content:  <EditTag close={this.close} addTag={this.addTag} modify={this.modify} chooseTag={this.chooseTag} delete={this.deleteTag}/>
    })
  }

  addTag(data){
    console.log(data)
    let tag = this.state.tags
    tag.push(data)
    this.setState({
      tags: tag,
      visible: false,
      content: ''
    })
  }

  chooseTag(data){
    let tag = this.state.tags
    tag.push(data)
    this.setState({
      tags: tag
    })

  }
  
  pullTag(e){
    console.log(e)
    let tag = this.state.tags
    tag = tag.splice(1, e)
    this.setState({
      tags: tag,
      onIndex: -1
    })
  }

  deleteTag(id){
    let tag = this.state.tags.filter(ele=>{
      console.log(ele, id)
      return ele.TID !== id
    })
    console.log(tag, id)
    this.setState({
      tags: tag
    })
  }

  modify(data){
    let that = this
    let tag = [], tagTID = []
    that.state.tags.forEach(ele=>{
      tagTID.push(ele.TID)
    })
    data.forEach(element => {
      if(tagTID.indexOf(element.TID) !== -1){
        tag.push(element)
      }
    });
    this.setState({
      tags: tag
    })
  }

  close(){
    console.log('close')
    this.setState({
      visible: false,
      content: ''
    })
  }

  onMouseOver(data){
    this.setState({
      onIndex: data
    })
  }

  onMouseLeave(){
    this.setState({
      onIndex: -1
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.tags.length === 0 &&
          <Popover visible={this.state.visible} content={this.state.content} trigger="click">
              <span className='add-tag' onClick={this.open}>添加标签</span>
          </Popover>
        }
        {this.state.tags.map((element, index) => {
            return (
              <div className='tag' onMouseOver={this.onMouseOver.bind(this, index)} onMouseLeave={this.onMouseLeave} style={{background: element.color}}>
                {element.name}&nbsp;&nbsp;
                {this.state.onIndex === index && <span onClick={this.pullTag.bind(this, index)} ><CloseCircleOutlined /></span>}
              </div>)
          }) 
        }
        
        {this.state.tags.length !== 0 && 
        <Popover visible={this.state.visible} content={this.state.content} trigger="click">
            <PlusCircleFilled onClick={this.open} style={{color: '#D3D3D3'}}/>
        </Popover> }
      </div>
    );
  }
  
}

export default App;
