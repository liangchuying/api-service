"use client";

import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import { forwardRef } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends Omit<AntButtonProps, "variant"> {
  // 自定义 variant 属性（用于样式类）
  customVariant?: "primary" | "secondary";
}

/**
 * 通用按钮组件
 * 基于 Ant Design Button 封装，便于统一管理和扩展
 * 示例：如何使用 Sass 模块样式
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, customVariant, ...props }, ref) => {
    // 合并自定义样式类
    const buttonClass = [
      styles.button,
      customVariant && styles[`button--${customVariant}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <AntButton ref={ref} className={buttonClass} {...props}>
        {children}
      </AntButton>
    );
  }
);

Button.displayName = "Button";

export default Button;

