// Get color from priority type

// type Priority = "Bassa" | "Media" | "Alta";

export function getColor(priority: string) {
    switch(priority)
    {
        case "Low":
            return "#00c950";

        case "Medium":
            return "#f0b100";

        case "High":
            return "#fb2c36";
    }
}