export interface ReportFilterModel {
    ReportName: string;
    SelectionFormula: string;
    Parameters: ReportParameters[];
    Queries: string[];
    SP_Queries: SP_queries[];
    ExportType?: ExportFormatType | null;
}
export interface ReportParameters {
    Key: string;
    Value: string;
}
export interface SP_queries{
    SP_Name : string;
    Parameters: ReportParameters[]
}
export enum ExportFormatType {
    NoFormat = 0,
    CrystalReport = 1,
    RichText = 2,
    WordForWindows = 3,
    Excel = 4,
    PortableDocFormat = 5,
    HTML32 = 6,
    HTML40 = 7,
    ExcelRecord = 8,
    Text = 9,
    CharacterSeparatedValues = 10,
    TabSeparatedText = 11,
    EditableRTF = 12,
    Xml = 13,
    RPTR = 14,
    ExcelWorkbook = 15,
    XLSXPagebased = 16,
    XLSXRecord = 17
  }
  