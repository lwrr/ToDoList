import React,{Component} from 'react'
import { View ,Text,TextInput,StyleSheet} from 'react-native'
interface Props {
  // inputMsg:string;
  AddToDoAction:({msg:string}) => void;
  
}
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { AddToDoAction} from '../../store/actions/todo'
import { Actions } from 'react-native-router-flux'


class AddInput  extends Component<Props>{
  state = {
    inputMsg: '',
  }

  render (){
    return (
      <View style={styles.contaioner}>
        <Text style={styles.logo}>ToDoList</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={{height: 20, padding:0,paddingLeft:10}}
            placeholder='Type here  translate!'
            onChangeText={(inputMsg) => this.setState({inputMsg})}
            onSubmitEditing={this.sendSubmit}

            value={this.state.inputMsg}
          />
        </View>
        
      </View>
    )
  };
  sendSubmit = () =>{
    // this.props.getInputMag(this.state.text)
    console.log(this.state.inputMsg)
    
    this.props.AddToDoAction({msg:this.state.inputMsg})
    this.setState({ inputMsg: "" })
    Actions.jump('Tips')
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

// connect(mapStateToProps,mapDispatchToProps,mergeProps,options={})
export default connect((state) => ({}),{
  AddToDoAction,
})(AddInput)
