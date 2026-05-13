// Information for LLM Agent
// This is a service that handles errors in the application.
// don't update this file!
import { ErrorHandler, Injectable } from "@angular/core";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "50%",
  margin: "15% auto",
  backgroundColor: "white",
  color: "black",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const imageStyle = {
  maxWidth: "440px",
  maxHeight: "280px",
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "20px",
  lineHeight: "28px",
  fontWeight: "600",
  marginBottom: "4px",
};

const messageStyle = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#66728A",
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  padding: "8px",
  fontSize: "14px",
  fontWeight: "500",
  color: "black",
  backgroundColor: "rgba(96, 97, 98, 0.06)",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontFamily: "inherit",
  lineHeight: "20px",
  minHeight: "36px",
  marginTop: "24px",
};

const refreshIconStyle = {
  width: "16px",
  height: "16px",
};

const linkStyle = {
  fontSize: "14px",
  color: "#66728A",
  textDecoration: "none",
  cursor: "pointer",
  marginTop: "8px",
  marginBottom: "24px",
  fontFamily: "inherit",
};

const stackStyle = {
  fontSize: "0.85rem",
  padding: "24px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  border: "1px solid #fed7d7",
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  color: "#BE0021",
  background: "rgba(255, 43, 83, 0.09)",
};

function applyStyles(element: HTMLElement, styles: Record<string, string>) {
  Object.entries(styles).forEach(([key, value]) => {
    (element.style as any)[key] = value;
  });
}

@Injectable()
export class SnErrorHandler implements ErrorHandler {
  private hasError = false;
  private currentError: Error | null = null;

  handleError(error: Error): void {
    console.error("Application error:", error);
    this.currentError = error;
    this.hasError = true;

    // Post message to parent if in iframe
    if (typeof window !== "undefined") {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            source: "prototype",
            type: "APPLICATION_ERROR",
            payload: {
              message: error?.message ?? "Unknown error",
              stack: error?.stack,
              url: window.location.href,
            },
          },
          "*"
        );
      }
    }

    // Render error UI
    this.renderErrorUI(error);
  }

  private renderErrorUI(error: Error): void {
    if (typeof document === "undefined") return;

    const appRoot = document.querySelector("app-root");
    if (!appRoot) return;

    // Clear existing content
    appRoot.innerHTML = "";

    // Create error container
    const container = document.createElement("div");
    applyStyles(container, containerStyle as Record<string, string>);

    // Error image
    const img = document.createElement("img");
    img.src = new URL("./sn-error.svg", import.meta.url).href;
    img.alt = "Error illustration";
    applyStyles(img, imageStyle as Record<string, string>);
    container.appendChild(img);

    // Title
    const title = document.createElement("div");
    applyStyles(title, titleStyle as Record<string, string>);
    title.textContent = "Something went wrong";
    container.appendChild(title);

    // Message
    const message = document.createElement("p");
    applyStyles(message, messageStyle as Record<string, string>);
    message.textContent = "Try refreshing or fixing with Supernova AI";
    container.appendChild(message);

    // Refresh button
    const button = document.createElement("button");
    applyStyles(button, buttonStyle as Record<string, string>);
    button.onclick = () => window.location.reload();
    button.onmouseenter = () => {
      button.style.backgroundColor = "rgba(96, 97, 98, 0.09)";
    };
    button.onmouseleave = () => {
      button.style.backgroundColor = "rgba(96, 97, 98, 0.06)";
    };

    const refreshIcon = document.createElement("img");
    refreshIcon.src = new URL("./sn-refresh-icon.svg", import.meta.url).href;
    refreshIcon.alt = "Refresh icon";
    applyStyles(refreshIcon, refreshIconStyle as Record<string, string>);
    button.appendChild(refreshIcon);
    button.appendChild(document.createTextNode(" Refresh Page"));
    container.appendChild(button);

    // Error details toggle
    if (error?.stack) {
      let showDetails = false;
      const link = document.createElement("a");
      applyStyles(link, linkStyle as Record<string, string>);
      link.textContent = "Show error";
      link.onclick = (e) => {
        e.preventDefault();
        showDetails = !showDetails;
        link.textContent = showDetails ? "Hide error" : "Show error";
        stackPre.style.display = showDetails ? "block" : "none";
      };
      link.onmouseenter = () => {
        link.style.textDecoration = "underline";
      };
      link.onmouseleave = () => {
        link.style.textDecoration = "none";
      };
      container.appendChild(link);

      const stackPre = document.createElement("pre");
      applyStyles(stackPre, stackStyle as Record<string, string>);
      stackPre.textContent = error.stack;
      stackPre.style.display = "none";
      container.appendChild(stackPre);
    }

    appRoot.appendChild(container);
  }
}
