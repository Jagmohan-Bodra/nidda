import React, { Component, createRef } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { colors } from "../themes/variables";

class Input extends Component<any, any> {
  ref = createRef<TextInput>();
  focus = () => {
    if (this.ref.current) this.ref.current.focus();
  };

  render() {
    return (
      <React.Fragment>
        {this.props.icon && (
          <View
            style={{
              left: 6,
              top: 0,
              elevation: 10,
              height: 90,
              width: 50,
              zIndex: 100,
              backgroundColor: colors.theme,
              //shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={this.props.icon}
              style={this.props.iconStyles ? this.props.iconStyles : null}
            />
          </View>
        )}
        <TextInput
          ref={this.ref}
          {...this.props}
          style={[this.props.style, { color: colors.black }]}
        />
        {this.props.error && (
          <Text
            style={{
              color: "red",
              paddingLeft: 20,
              marginTop: 3,
              fontFamily: "Lato-Regular",
            }}
          >
            {this.props.message}
          </Text>
        )}
      </React.Fragment>
    );
  }
}

export default Input;
