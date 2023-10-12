import styles from "../../sass/styles.module.scss";

export const smartPredictionStyles = {
  drawerList: {
    ".MuiListItem-root": {
      "&.Mui-selected": {
        backgroundColor: "red",
      },
    },
  },
  monitorTab: {
    display: "flex",
    minHeight: "100%",
    height: "auto",
    ".MuiGrid-grid-lg-1": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ".MuiGrid-grid-lg-11": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ".MuiAppBar-root": {
      backgroundColor: styles.whiteColor,
      color: styles.primaryColor,
      height: "4rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  drawer: {
    width: 140,
    marginTop: "4rem",
    height: "auto",
    position: "sticky",
    border: "none",
    ".MuiDrawer-paper": {
      border: "none",
      width: 140,
      boxSizing: "border-box",
      position: "sticky",
      borderRight: `0.05rem solid ${styles.grayColor}`,
      borderBottom: `0.05rem solid ${styles.grayColor}`,
      ".MuiDivider-root": {
        borderBottom: `0.01rem solid ${styles.grayColor}`,
      },
      ".MuiList-root": {
        paddingTop: "0rem",
        paddingBottom: "0rem",
        ".MuiListItem-root": {
          height: "5rem",
          borderBottom: `1px solid ${styles.grayColor}`,
          ".MuiListItemButton-root": {
            height: "100%",
            textAlign: "center",
            color: styles.primaryColor,
            "&:hover": {
              backgroundColor: styles.whiteColor,
            },
            "&.Mui-selected": {
              color: styles.whiteColor,
              backgroundColor: styles.primaryColor,
            },
          },
        },
      },
    },
  },
  mainContent: {
    marginTop: "4rem",
    width: "100%",
  },
  activeTab: {
    backgroundColor: styles.primaryColor,
    color: styles.whiteColor,
  },
  inactiveTab: {
    color: styles.primaryColor,
    "&:hover": {
      backgroundColor: styles.secondaryColor,
    },
  },
  monitorFormsSection: {
    width: "100%",
    borderBottom: `1px solid ${styles.grayColor}`,
    height: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ".MuiFormControl-root": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      ".MuiFormLabel-root": {
        backgroundColor: styles.lightGray,
        height: "2rem",
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      },
    },
    ".MuiInputBase-root": {
      height: "2rem",
      width: "15rem",
      paddingY: "1.5rem",
      marginLeft: "2rem",
    },
    ".MuiSelect-select ": {
      height: "0rem",
      padding: "1rem",
    },
    ".MuiButton-root": {
      backgroundColor: styles.primaryColor,
      height: "2.8rem",
    },
  },
  vibrationTab: {
    width: "100%",
    ".recharts-legend-item": {
      margin: "1rem",
    },
  },
  chartSection: {
    marginTop: "3rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    ".recharts-legend-item": {
      margin: "1rem",
    },
  },
  vibrationStatus: {
    height: "2rem",
    width: "5rem",
    border: `0.3rem solid ${styles.liteGrayColor}`,
    boxSizing: "border-box",
  },
  dangerColor: {
    backgroundImage: `linear-gradient(to top, #ff0844 0%, #ffb199 100%)`,
  },
  datePickerModal: {
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
    padding: "1rem",
    ".MuiBox-root": {
      backgroundColor: styles.whiteColor,
      width: "60%",
      height: "20%",
      display: "flex",
      flexDirection: "column",
      ".MuiBox-root": {
        borderBottom: `0.05rem solid ${styles.liteGrayColor}`,
        width: "100%",
        height: "5rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: "1rem",
        ".MuiIconButton-root": {
          width: "fit-content",
        },
      },
      ".MuiGrid-container": {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ".MuiGrid-grid-md-4": {
          display: "flex",
          justifyContent: "end",
          alignItems: "left",
          flexDirection: "column",
          paddingX: "1rem",
          height: "4rem",
        },
      },
    },
  },
  table: {
    ".MuiDataGrid-virtualScroller": {
      overflow: "hidden",
    },
    ".MuiDataGrid-columnHeaders": {
      backgroundColor: styles.primaryColor,
      color: styles.whiteColor,
    },
    ".MuiDataGrid-columnHeaderTitleContainer": {
      display: "flex",
      justifyContent: "center",
    },
    ".MuiDataGrid-cell": {
      display: "flex",
      justifyContent: "center",
    },
  },
  settingsTab: {
    ".css-vfnuk0-MuiPaper-root-MuiAccordion-root:before": {
      background: "none",
    },
  },
  configurationInput: {
    width: "50px",
  },
};
