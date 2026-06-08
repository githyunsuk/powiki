import { Chip, Tooltip } from "@mui/material";

interface MoveBadgeProps {
  name: string;
  description: string;
}

export default function MoveBadge({name, description}: MoveBadgeProps) {

  return(
    <Tooltip title={description} arrow>
      <Chip 
        label={name} 
        size="small" 
        sx={{ 
          fontSize: "10px", 
          height: "20px", 
          bgcolor: "#f5f5f5", 
          color: "#616161",
          border: "1px solid #ddd"
        }}
      />
    </Tooltip>
  )
}