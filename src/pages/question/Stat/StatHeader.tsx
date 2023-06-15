import React, { useMemo, useRef } from 'react'
import type { FC } from 'react'
import { Space, Button, Typography, Input, Tooltip, InputRef, message, Popover } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import styles from './StatHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const { Title } = Typography

const StatHeader: FC = () => {
	const nav = useNavigate()

	const { title, isPublished } = useGetPageInfo()
	const { id } = useParams()

	const urlInputRef = useRef<InputRef>(null)

	/**
	 * @description: 拷贝链接
	 */
	const copy = () => {
		const elem = urlInputRef.current
		if (!elem) return
		elem.select() // 选中 input 的内容
		document.execCommand('copy') // 拷贝选中内容
		message.success('拷贝成功')
	}

	/**
	 * @description: 生成链接和二维码
	 */
	// const genLinkAndQRCodeElem = () => {
	// 	if (!isPublished) return null

	// 	const url = `http://localhost:3000/question/${id}` // 拼接url需要参考 C 端的规则

	// 	const QRCodeElem = (
	// 		<div style={{ textAlign: 'center' }}>
	// 			<QRCodeSVG value={url} size={150} />
	// 		</div>
	// 	)

	// 	return (
	// 		<Space>
	// 			<Input ref={urlInputRef} value={url} style={{ width: '300px' }} />
	// 			<Tooltip title="拷贝链接">
	// 				<Button icon={<CopyOutlined />} onClick={copy}></Button>
	// 			</Tooltip>
	// 			<Popover content={QRCodeElem}>
	// 				<Button icon={<QrcodeOutlined />}></Button>
	// 			</Popover>
	// 		</Space>
	// 	)
	// }

	const LinkAndQRCodeElem = useMemo(() => {
		if (!isPublished) return null

		const url = `http://localhost:3000/question/${id}` // 拼接url需要参考 C 端的规则

		const QRCodeElem = (
			<div style={{ textAlign: 'center' }}>
				<QRCodeSVG value={url} size={150} />
			</div>
		)

		return (
			<Space>
				<Input ref={urlInputRef} value={url} style={{ width: '300px' }} />
				<Tooltip title="拷贝链接">
					<Button icon={<CopyOutlined />} onClick={copy}></Button>
				</Tooltip>
				<Popover content={QRCodeElem}>
					<Button icon={<QrcodeOutlined />}></Button>
				</Popover>
			</Space>
		)
	}, [id, isPublished])

	return (
		<div className={styles['heade-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button
							type="link"
							icon={<LeftOutlined />}
							onClick={() => {
								nav(-1)
							}}
						>
							返回
						</Button>
						<Title>{title}</Title>
					</Space>
				</div>
				<div className={styles.main}>{LinkAndQRCodeElem}</div>
				<div className={styles.right}>
					<Button
						type="primary"
						onClick={() => {
							nav(`/question/edit/${id}`)
						}}
					>
						编辑问卷
					</Button>
				</div>
			</div>
		</div>
	)
}

export default StatHeader
