"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  Upload,
  Spin,
  Typography,
  Row,
  Col,
  Divider,
  Collapse,
  Image as AntImage
} from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { removeBackground } from "@imgly/background-removal";
import TextCustomizer from "./_components/text-customizer";
import "@/app/fonts.css";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const { Title } = Typography;
const { Panel } = Collapse;

interface TextSet {
  id: number;
  text: string;
  fontFamily: string;
  top: number;
  left: number;
  color: string;
  fontSize: number;
  fontWeight: number;
  opacity: number;
  shadowColor: string;
  shadowSize: number;
  rotation: number;
}

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
  const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(
    null
  );
  const [textSets, setTextSets] = useState<TextSet[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const setupImage = async (imageUrl: string) => {
    try {
      const imageBlob = await removeBackground(imageUrl);
      const url = URL.createObjectURL(imageBlob);
      setRemovedBgImageUrl(url);
      setIsImageSetupDone(true);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewTextSet = () => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [
      ...prev,
      {
        id: newId,
        text: "edit",
        fontFamily: "Inter",
        top: 0,
        left: 0,
        color: "white",
        fontSize: 100,
        fontWeight: 800,
        opacity: 1,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowSize: 4,
        rotation: 0,
      },
    ]);
  };

  const handleAttributeChange = (
    id: number,
    attribute: string,
    value: string | number
  ) => {
    setTextSets((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [attribute]: value } : set))
    );
  };

  const duplicateTextSet = (textSet: TextSet) => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [...prev, { ...textSet, id: newId }]);
  };

  const removeTextSet = (id: number) => {
    setTextSets((prev) => prev.filter((set) => set.id !== id));
  };

  const saveCompositeImage = () => {
    if (!canvasRef.current || !isImageSetupDone) return;

    setIsDownloading(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsDownloading(false);
      return;
    }

    const bgImg = document.createElement("img");
    bgImg.crossOrigin = "anonymous";
    bgImg.onload = () => {
      canvas.width = bgImg.naturalWidth;
      canvas.height = bgImg.naturalHeight;

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      textSets.forEach((textSet) => {
        ctx.save();
        ctx.font = `${textSet.fontWeight} ${
          (textSet.fontSize * canvas.width) / 1000
        }px ${textSet.fontFamily}, sans-serif`;
        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const x = (canvas.width * (textSet.left + 50)) / 100;
        const y = (canvas.height * (50 - textSet.top)) / 100;

        ctx.translate(x, y);
        ctx.rotate((textSet.rotation * Math.PI) / 180);
        ctx.fillText(textSet.text, 0, 0);
        ctx.restore();
      });

      if (removedBgImageUrl) {
        const removedBgImg = document.createElement("img");
        removedBgImg.crossOrigin = "anonymous";
        removedBgImg.onload = () => {
          ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
          triggerDownload();
        };
        removedBgImg.src = removedBgImageUrl;
      } else {
        triggerDownload();
      }
    };
    bgImg.onerror = () => {
      setIsDownloading(false);
    };
    bgImg.src = selectedImage || "";

    function triggerDownload() {
      try {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "text-behind-image.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error(error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const downloadRemovedBgImage = () => {
    if (removedBgImageUrl) {
      const link = document.createElement("a");
      link.href = removedBgImageUrl;
      link.download = "removed-bg-image.png";
      link.click();
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: "10px" }}>
      <Row justify="space-between" align="middle" style={{ padding: "20px 40px" }}>
        <Link href="/" className="font-bold text-2xl text-lg flex items-center text-black hover:text-black">
          Pic<span className="bg-[#9CA986] text-white px-1 rounded">me</span>
        </Link>
        <Col className="flex items-center">
        <Link href="https://www.instagram.com/ankitpanwar07/" target="_blank" className="font-bold text-2xl text-lg flex items-center text-black hover:text-black">
        <InstagramOutlined style={{ fontSize: '28px', color: '#9ca986', marginRight: '10px' }} />
        </Link>
          <Upload
            ref={fileInputRef}
            accept=".jpg, .jpeg, .png"
            showUploadList={false}
            beforeUpload={(file) => {
              const imageUrl = URL.createObjectURL(file);
              setSelectedImage(imageUrl);
              setupImage(imageUrl);
              return false;
            }}
          >
            <Button icon={<PlusOutlined />}>Upload Image</Button>
          </Upload>
        </Col>
      </Row>
      <Divider />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {selectedImage ? (
        <>
          <Row style={isDesktopOrLaptop ? { padding: "40px" } : { padding: "20px" }} gutter={16} align="top">
            <Col xs={24} md={10} style={{ position: "relative", padding: "10px" }}>
              {isImageSetupDone ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    style={{ width: "100%", height: "auto", cursor: "pointer" }}
                  />
                  {removedBgImageUrl && (
                    <img
                      src={removedBgImageUrl}
                      alt="Removed bg"
                      style={{ width: "100%", height: "auto", position: "absolute", top: 0, left: 0, zIndex: 1, cursor: "pointer" }}
                    />
                  )}
                  {isImageSetupDone && textSets.map((textSet) => (
                    <div key={textSet.id} style={{ position: "absolute", top: `${50 - textSet.top}%`, left: `${textSet.left + 50}%`, transform: `translate(-50%, -50%) rotate(${textSet.rotation}deg)`, color: textSet.color, textAlign: "center", fontSize: `${textSet.fontSize}px`, fontWeight: textSet.fontWeight, fontFamily: textSet.fontFamily, opacity: textSet.opacity, zIndex: 0 }}>
                      {textSet.text}
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ textAlign: "center", margin: "25px 0 0 0" }}>
                  <Spin />
                </div>
              )}
            </Col>
            <Col xs={24} md={14}>
              <Title level={4}>Manage Text</Title>
              <Button onClick={addNewTextSet} style={{ marginBottom: "20px" }}>
                Add Text
              </Button>
              <Collapse accordion>
                {textSets.map((textSet, index) => (
                  <Panel
                    header={`Text Block ${index + 1}`}
                    key={textSet.id}
                    extra={
                      <>
                        <Button type="link" onClick={() => duplicateTextSet(textSet)} style={{ marginRight: 10 }}>
                          Duplicate
                        </Button>
                        <Button type="link" onClick={() => removeTextSet(textSet.id)}>
                          Remove
                        </Button>
                      </>
                    }
                  >
                    <TextCustomizer
                      textSet={textSet}
                      handleAttributeChange={handleAttributeChange}
                      removeTextSet={removeTextSet}
                      duplicateTextSet={duplicateTextSet}
                    />
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
          <Divider />
          <Row justify="center" gutter={16} style={{ rowGap: "20px" }}>
            <Col>
              <Button
                type="primary"
                onClick={saveCompositeImage}
                icon={<DownloadOutlined />}
                disabled={isDownloading}
              >
                {isDownloading ? "Downloading..." : "Download Image with Text"}
              </Button>
            </Col>
            {removedBgImageUrl && (
              <Col>
                <Button onClick={downloadRemovedBgImage} icon={<DownloadOutlined />}>
                  Download Background-Removed Image
                </Button>
              </Col>
            )}
          </Row>
          <Divider />
          <Row justify="center" gutter={16} className="mb-6">
            <Col xs={24} md={10}>
              <Title level={3} style={{ textAlign: "center" }}>Original Image</Title>
              <div>
                <AntImage
                  src={selectedImage}
                  alt="Original Image"
                  width="100%"
                  height="auto"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Col>
            <Col xs={24} md={10}>
              <Title level={3} style={{ textAlign: "center" }}>Background Removed Image</Title>
              {removedBgImageUrl ? (
                <div>
                  <AntImage
                    src={removedBgImageUrl}
                    alt="Background Removed"
                    width="100%"
                    height="auto"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div style={{ textAlign: "center", margin: "150px 0 0 0" }}>
                  <Spin />
                </div>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Title level={5}>Upload an image to begin </Title>
        </div>
      )}
    </div>
  );
};

export default Page;
