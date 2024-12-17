export interface MainContentProps {
    currentDate: Date | null;
    onChange: (value: Date | null) => void;
    onSearch?: (val:string) => void;
}
