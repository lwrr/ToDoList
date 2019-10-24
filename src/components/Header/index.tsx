import React,{Component} from 'react'
import { View ,Text,TextInput,StyleSheet} from 'react-native'
interface Props {
  getInputMag?:any
  
}
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { HeaderAction} from '../../store/actions/header'

export default class AddInput  extends Component<Props>{
  state = {
    text: '',
  }

  render (){
    return (
      <View style={styles.contaioner}>
        <Text style={styles.logo}>ToDoList</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={{height: 20, padding:0,paddingLeft:10}}
            placeholder='Type here  translate!'
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.sendSubmit}

            value={this.state.text}
          />
        </View>
        
      </View>
    )
  };
  sendSubmit = () =>{
    this.props.getInputMag(this.state.text)
  }
}


const styles = StyleSheet.create({
  contaioner:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor:'#000',
    height:40,
    padding:15,
  },
  logo:{
    color:"#fff",
    fontSize:20,
    paddingRight:50,
    height:40,
    lineHeight:40,
   
  },
  inputWrap:{
    height:20,
    overflow:"hidden",
    borderRadius:4,
    backgroundColor:"#ccc",
    fontSize:14,
    flex:1,
    // color:"red",
  },
})

