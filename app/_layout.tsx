import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options ={{title: "Home"}} />
    <Stack.Screen name="welcome" options ={{title: "Bienvenida"}} />
    <Stack.Screen name="capabilities" options ={{title: "capabilities"}} />
    <Stack.Screen name="chat" options ={{title: "chat"}} />
    <Stack.Screen name="limitations" options ={{title: "limitations"}} />
  </Stack>
}
