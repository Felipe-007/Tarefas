import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414',
  },
  handleLogin: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF4130',
    marginTop: 6,
    borderRadius: 6,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  signText: {
    textAlign: 'center',
    color: '#FFF',
    marginTop: 10,
  },
  viewImagem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    textAlign: 'center',
    marginTop: 44,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#FFFFFF',
    marginBottom: 10,
  },
})