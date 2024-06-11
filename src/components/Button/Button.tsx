import React from "react";
import style from "./Button.module.scss";

interface TitleProps {
  children?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  className?: boolean;
  mode?: string;
  appearance?: string;
  stretched?: string;
  size?: string;
}

const Button = ({
  children,
  mode,
  appearance,
  stretched,
  before,
  after,
  className,
  size,
  ...props
}: TitleProps) => {
  return (
    <button
      className={`
        ${style.container}
        ${mode === "primary" && style.primary}
        ${mode === "outline" && style.outline}
        ${mode === "secondary" && style.secondary}
        ${appearance === "accent" && style.accent}
        ${appearance === "positive" && style.positive}
        ${stretched && style.stretched}
        ${size === "compact" && style.compact}
      `}
      {...props}
    >
      <div className={style.before}>{before}</div>
      <div className={style.text}>{children}</div>
      <div className={style.after}>{after}</div>
    </button>
  );
};

export default Button;
