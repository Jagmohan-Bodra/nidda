import React, { Component } from "react";
import { ActivityIndicator, Text } from "react-native";
import Touchable from "./Touchable";

class Button extends Component<any, any> {
  render() {
    return (
      <Touchable
        {...this.props}
        style={{
          backgroundColor: this.props.disabled ? "grey" : this.props.color,
          width: this.props.width ? this.props.width : "80%",
          height: 42,
          padding: 10,
          margin: 10,
          borderRadius: this.props.borderRadius ? this.props.borderRadius : 20,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 8,
          marginTop: 10,
        }}
      >
        {this.props.loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={{
              color: this.props.titleColor ? this.props.titleColor : "#fff",
              fontSize: 20,
              fontFamily: "Lato-Bold",
            }}
          >
            {this.props.title}
          </Text>
        )}
      </Touchable>
    );
  }
}

export default Button;
