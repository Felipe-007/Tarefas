import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2f6fc',
    padding: 25,
    paddingHorizontal: 10,
  },
  containerTask: {
    flexDirection: 'row',
    marginTop: 30,
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
  },
  buttonAdd: {
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  },
})