import React, {Component} from 'react';
import {Button, List, Space, Input} from 'antd'
import {PlusCircleFilled, LeftOutlined, EditOutlined, BulbFilled, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import './editTag.css';

class editTag extends Component {
  constructor(props){
    super(props)
    this.state = {
        content: '',
        tagsData: [{
            name: '测试',
            state: false,
            color: '#1E90FF',
            id: 123
        }],
        tagName: '',
        modify: false,
        newTag: false,
        colors: ['#FFC0CB', '#1E90FF', '#FFA500', '#00FFFF','#00FF00'],
        tagColor: 1,
        newTagColor: '',
        modifyTag: {
          name: '测试',
          state: false,
          color: '#1E90FF',
          id: 123
      },
        modifyTagColor: []
    }
  }

  componentDidMount(){
    let that = this
    let tagColor = [
      <div style={{width: '100%',border: '0.5px solid #D3D3D3'}}></div>
    ]
    this.state.colors.forEach((ele, index)=>{
      tagColor.push(
        <div className='new-tag-color' style={{background: ele, marginLeft: index === 0 ? '' : '25px'}} onClick={this.changeColor.bind(this, index)}>
          {that.state.tagColor === index && <CheckOutlined className='new-tag-check-color'/>}
        </div>
      )
    })
    tagColor.push(
    <div>
      <Button shape="round" style={{width: '100%', marginTop: '10px'}} type='primary'>创建</Button>
    </div>)
    this.setState({
      newTagColor: tagColor
    })
  }

  edit = (e) => {
    console.log(e)
    let tagColor = []
    let modifyTag = this.state.tagsData[e]
    console.log(modifyTag)
    this.state.colors.forEach((ele, index)=>{
      console.log(modifyTag.color === ele )
      tagColor.push(
        <div className='new-tag-color' style={{background: ele, marginLeft: index === 0 ? '' : '25px'}} onClick={this.changeColor.bind(this, index)}>
          {modifyTag.color === ele && <CheckOutlined className='new-tag-check-color'/>}
        </div>
      )
    })
    this.setState({
      modifyTagColor: tagColor,
      modifyTag: modifyTag,
      modify: true,
      newTag: false,
    })
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
      this.setState({
        modify: false,
        newTag: true,
      })
    }
  }

  changeColor = (e) => {
    console.log(e)
  }

  render(){
    return (
      <div>
        {
          !this.state.modify && 
          <Input ref={(input) => this.tagName = input} onChange={this.tagChange} placeholder='搜索标签' bordered={false} suffix={
            <PlusCircleFilled onClick={this.addTag} style={{color: '#1E90FF'}}/>
          }></Input>
        }
        {
          this.state.modify && 
          <div style={{width: '210px'}}>
            <div className='modify-title'>
              <span style={{float: 'left'}}><LeftOutlined /></span>
              <span style={{color: 'black'}}>编辑标签</span>
              <span style={{float: 'right'}}><CloseOutlined /></span>
            </div>
            <div style={{width: '100%',border: '0.5px solid #D3D3D3', marginBottom: '10px'}}></div>
            <Input placeholder='标签名' ref={(input) => this.tagName = input} defaultValue={this.state.modifyTag.name} style={{marginBottom: '10px'}}></Input>
            {this.state.modifyTagColor}
            <br/>
            <Button  danger>删除</Button>
            <Button type='primary' style={{float: 'right'}}>完成</Button>
          </div>
        }
        {
          !this.state.newTag && !this.state.modify &&
          <div style={{width: '210px'}} >
            <div style={{width: '100%',border: '0.5px solid #D3D3D3'}}></div>
            <List dataSource={this.state.tagsData} renderItem={(item, index)=>(
            <List.Item key={item.id}>
                <span style={{color: item.color,width: '20px'}}><BulbFilled /></span>
                <span style={{width: '80px'}} onClick={this.add.bind(this, index)}>{item.name}</span>
                <span className='edit' onClick={this.edit.bind(this, index)}><EditOutlined /></span>
                <span className='check' onClick={this.check.bind(this, index)}><CheckOutlined /></span>
            </List.Item>
          )}/>
          </div>
        }{
          this.state.newTag && !this.state.modify && 
          this.state.newTagColor
        }
     </div>
    );
  }
  
}

export default editTag;
