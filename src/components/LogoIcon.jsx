import React from "react";
import { SvgIcon } from "@mui/material";

export default function LogoIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {/* A modern minimalist logo: an abstract 'C' merging into an upward growth chart / leaf */}
      <path d="M18.36 5.64A8.956 8.956 0 0012 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9h-2c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7c1.47 0 2.84.45 3.96 1.25L13 12h8V4l-2.64 1.64z" />
    </SvgIcon>
  );
}
