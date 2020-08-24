import React, {Component} from 'react';
import {Button, List, message, Input} from 'antd'
import {PlusCircleFilled, LeftOutlined, EditOutlined, BulbFilled, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import {getTag, insertTag, modifyTag, deleteTag, findTag} from '../interface/tag'
import './editTag.css';

class editTag extends Component {
  constructor(props){
    super(props)
    this.state = {
        content: '',
        tagList: [],
        tagName: '',
        modify: false,
        newTag: false,
        colors: ['#FFC0CB', '#1E90FF', '#FFA500', '#00FFFF','#00FF00'],
        newTagColor: 0,
        modifyTag: {}
    }

    this.close = this.close.bind(this)
    this.addTag = this.addTag.bind(this)
    this.modifyFinish = this.modifyFinish.bind(this)
    this.back = this.back.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount(){
    let that = this
    getTag({
      number: 10
    }).then(res=>{
      if(res.data.code !== 100){
        message.error(res.data.msg)
      }else{
        that.setState({
          tagList: res.data.data,
        })
      }
    })
  }

  edit = (e) => {
    console.log(e)
    let modifyTag = this.state.tagList[e]
    this.setState({
      modifyTag: modifyTag,
      modify: true,
      newTag: false,
    })
  }

  check = (e) => {
    console.log(e)
  }

  addTag(){
    let that = this
    let name = this.tagName.state.value || this.tagName.value
    let tagData = {
      name: name,
      state: false,
      color: that.state.colors[that.state.newTagColor],
    }
    insertTag(tagData).then(res=>{
      tagData['TID'] = res.data.data.TID
      that.props.addTag(tagData)
    })
  }

  tagChange = (e) => {
    let name = this.tagName.state.value || this.tagName.value
    let tag = this.state.tagList.filter(ele=>{
      if(ele.name.indexOf(name) !== -1)
      return  ele
    })
    let that = this
    if(tag.length === 0){
      if(this.state.tagList.length === 10){
        findTag({
          name: name
        }).then(res=>{
          if(res.data.code !== 100){
            message.error(res.data.msg)
          }else{
            if(res.data.data.length === 0){
              that.setState({
                modify: false,
                newTag: true,
              })
            }else{
              tag = res.data.data
              that.setState({
                tagList: tag,
                modify: false,
                newTag: false,
              })
            }
          }
        })
      }else{
        that.setState({
          modify: false,
          newTag: true,
        })
      }
    }else{
      that.setState({
        tagList: tag,
        modify: false,
        newTag: false,
      })
    }
  }

  changeColor = (e) => {
    console.log(e)
    this.setState({
      newTagColor: e
    })
  }

  changeModifyTagColor = (e) => {
    let that = this
    let modifyTag = that.state.modifyTag
    modifyTag.color = that.state.colors[e]
    this.setState({
      modifyTag: modifyTag
    })
  }

  back(){
    this.setState({
      modify: false,
      newTag: false
    })
  }

  close(){
    this.props.close()
  }

  modifyFinish(){
    let that = this
    modifyTag(that.state.modifyTag).then(res=>{
      if(res.data.code !== 100){
        message.error(res.data.msg)
      }else{
        let tag = that.state.tagList
        tag.forEach((ele, index)=>{
          if(ele.TID === that.state.modifyTag.TID){
            that.state.tagList[index] = that.state.modifyTag
            return
          }
        })
        that.props.modify(that.state.tagList)
        that.setState({
          tagList: that.state.tagList,
          modify: false,
          newTag: false
        })
      }
    })
  }

  delete(){
    let that = this
    deleteTag({
      TID: that.state.modifyTag.TID
    }).then(res=>{
      if(res.data.code !== 100){
        message.error(res.data.msg)
        return
      }
      let data = that.state.tagList.filter(ele=>{
        return ele.TID !== that.state.modifyTag.TID
      })
      that.setState({
        tagList: data,
        modify: false,
        newTag: false
      })
      that.props.delete(that.state.modifyTag.TID)
    })
  }

  chooseTag(e){
    let tag = this.state.tagList[e]
    this.props.chooseTag(tag)
  }

  render(){
    return (
      <div>
        {
          !this.state.modify && 
          <Input ref={(input) => this.tagName = input} onChange={this.tagChange} placeholder='搜索标签' bordered={false} suffix={
            <PlusCircleFilled onClick={this.addTag} style={{color: '#1E90FF'}}/>
          }></Input>
        }{
          this.state.modify && 
          <div style={{width: '210px'}}>
            <div className='modify-title'>
              <span style={{float: 'left'}} onClick={this.back}><LeftOutlined /></span>
              <span style={{color: 'black'}}>编辑标签</span>
              <span style={{float: 'right'}} onClick={this.close}><CloseOutlined /></span>
            </div>
            <div style={{width: '100%',border: '0.5px solid #D3D3D3', marginBottom: '10px'}}></div>
            <Input placeholder='标签名' ref={(input) => this.tagName = input} defaultValue={this.state.modifyTag.name} style={{marginBottom: '10px'}}></Input>
            {this.state.colors.map((ele, index)=>{
              return (
                <div className='new-tag-color' style={{background: ele, marginLeft: index === 0 ? '' : '25px'}} onClick={this.changeModifyTagColor.bind(this, index)}>
                  {this.state.modifyTag.color === ele && <CheckOutlined className='new-tag-check-color'/>}
                </div>
              )
            })}
            <br/>
            <Button onClick={this.delete} danger>删除</Button>
            <Button onClick={this.modifyFinish} type='primary' style={{float: 'right'}}>完成</Button>
          </div>
        }{
          !this.state.newTag && !this.state.modify &&
          <div style={{width: '210px'}} >
            <div style={{width: '100%',border: '0.5px solid #D3D3D3'}}></div>
            <List dataSource={this.state.tagList} renderItem={(item, index)=>(
            <List.Item key={item.id} >
                <span style={{color: item.color,width: '20px'}}><BulbFilled /></span>
                <span onClick={this.chooseTag.bind(this, index)} className='tag-list-name'>{item.name}</span>
                <span className='edit' onClick={this.edit.bind(this, index)}><EditOutlined /></span>
                <span className='check' onClick={this.check.bind(this, index)}><CheckOutlined /></span>
            </List.Item>
          )}/>
          </div>
        }{
          (this.state.newTag && !this.state.modify) && 
          <div style={{width: '210px'}}>
            <div style={{width: '100%',border: '0.5px solid #D3D3D3'}}></div>
            {
             this.state.colors.map((ele, index)=>{
                return (<div className='new-tag-color' style={{background: ele, marginLeft: index === 0 ? '' : '25px'}} onClick={this.changeColor.bind(this, index)}>
               {this.state.newTagColor === index && <CheckOutlined className='new-tag-check-color'/>}
                </div>)})
            }
            <Button onClick={this.addTag} shape="round" style={{width: '100%', marginTop: '10px'}} type='primary'>创建</Button>
          </div>
          
        }
     </div>
    );
  }
  
}

export default editTag;
