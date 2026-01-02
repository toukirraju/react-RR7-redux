import { Button as MantineButton } from "@mantine/core";
import type { ButtonProps as MantineButtonProps } from "@mantine/core";

export type ButtonProps = MantineButtonProps;

export function Button(props: ButtonProps) {
  return <MantineButton {...props} />;
}

