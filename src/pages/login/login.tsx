import { Flex, Text, Card, Button } from "@radix-ui/themes";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../stores/useUser";

type Form = {
  name: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const setName = useUser((state) => state.setName);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>();

  function handleLogin(values: Form) {
    if (values.name === "mateo" && values.password === "123mateo") {
      setName(values.name);
      return navigate("/home"); // Redirige al componente Home
    } else {
      setError("root", {
        message: "Credenciales incorrectas. Por favor, intenta de nuevo.",
      });
    }
  }

  return (
    <main className={styles.container}>
      <Card size="3">
        <form onSubmit={handleSubmit(handleLogin)}>
          <Flex direction="column" gap="4">
            <label>
              <Flex direction="column">
                <Text color="sky">username</Text>
                <input
                  className={styles.input}
                  placeholder="Your username"
                  {...register("name")}
                />
              </Flex>
            </label>
            <label>
              <Flex direction="column">
                <Text color="sky">password</Text>
                <input
                  className={styles.input}
                  placeholder="Your password"
                  type="password"
                  {...register("password")}
                />
              </Flex>
            </label>
            <Button type="submit">Login</Button>
            {errors?.root && (
              <Text style={{ color: "red" }}>{errors.root.message}</Text>
            )}
          </Flex>
        </form>
      </Card>
    </main>
  );
}