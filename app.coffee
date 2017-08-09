
draw_emoji = ({eyes, mouth}, x, y, diameter)->
	
	radius = diameter / 2
	
	yellow_gradient = ctx.createLinearGradient 0, -radius, 0, diameter
	
	yellow_gradient.addColorStop 0.0, '#fcf5b5'
	yellow_gradient.addColorStop 0.5, '#f1da36'
	yellow_gradient.addColorStop 1.0, '#f4c838'
	

	ctx.save()
	ctx.translate(x, y)
	
	ctx.beginPath()
	ctx.arc(0, 0, radius, 0, TAU)
	ctx.fillStyle = yellow_gradient
	ctx.fill()
	ctx.beginPath()
	ctx.arc(0, 5, radius * 0.92, 0, TAU)
	ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
	ctx.lineWidth = 10
	ctx.stroke()
	ctx.beginPath()
	ctx.arc(0, 0, diameter/2, 0, TAU)
	ctx.strokeStyle = "black"
	ctx.lineWidth = 10 # TODO: scale the strokes
	ctx.stroke()
	
	
	if mouth
		ctx.beginPath()
		#ctx.moveTo(-radius/2, radius*0.2)
		#ctx.lineTo(-radius/2*0.9, radius*0.4)
		#ctx.lineTo(0, radius*0.5)
		#ctx.lineTo(+radius/2*0.9, radius*0.4)
		#ctx.lineTo(+radius/2, radius*0.2)
		
		smile_y = mouth.smile * radius*0.2
		
		for i in [0..1] by 0.1
			ctx.lineTo(
				cos(i * PI) * radius/2
				sin(i * PI) * radius/2 * mouth.smile + radius*0.2 - smile_y
			)
		
		ctx.strokeStyle = "black"
		ctx.lineJoin = "round"
		ctx.lineCap = "round"
		ctx.lineWidth = 10
		if mouth.open
			ctx.closePath()
			ctx.fillStyle = "white"
			ctx.fill()
		
		ctx.stroke()
		
		if mouth.tongue
			# TODO: mesh well with the mouth (in more cases)
			# and maybe don't do tongues that are only slightly out
			ctx.beginPath()
			for i in [0..1] by 0.1
				ctx.lineTo(
					cos(i * PI) * radius/3
					sin(i * PI) * radius/2 * mouth.tongue + radius*0.2 + smile_y * (if mouth.open then 0 else 1)
				)
			
			ctx.strokeStyle = "black"
			ctx.lineJoin = "round"
			ctx.lineCap = "round"
			ctx.lineWidth = 10
			ctx.closePath()
			ctx.fillStyle = "#f34"
			ctx.fill()
			ctx.stroke()
			# TODO: add line down middle of tongue
	
	
	draw_eye = (eye, x, y)->
		ctx.beginPath()
		if eye.wink
			ctx.moveTo(x - radius/7, y)
			ctx.lineTo(x + radius/7, y)
			ctx.strokeStyle = "black"
			ctx.lineWidth = 10
			ctx.stroke()
		else
			ctx.arc(x, y, radius/6, 0, TAU)
			ctx.fillStyle = "black"
			ctx.fill()
	
	if eyes?.left
		draw_eye(eyes.left, -radius*0.4, -radius/3)
	if eyes?.right
		draw_eye(eyes.right, +radius*0.4, -radius/3)
	
	
	ctx.restore()


make_random_emoji = ->
	random_eye = ->
		wink: Math.random() < 0.3 # bool
	eyes:
		left: random_eye()
		right: random_eye()
		# TODO: offsets or whatever
		# TODO: hearts, dollars, stars
		# also: XD  >_<  ^_^  ._.  8)  B)
		# what about spider eyes? ::::)
	mouth:
		smile: Math.random() - Math.random() # -1..1 (negative for frown)
		open: Math.random() < 0.3 # 0..1?
		# teeth: 0 # 0..1 or bool? what would this define exactly?
		# slant: 0 # -1..1?
		tongue: # -1..1? TODO: offsets or angle or whatever
			if Math.random() < 0.7
				Math.random() - Math.random()
		# TODO: width & offset or whatever
		# TODO: :O :o :3 :S :P :9 :F :C :c :B :] :J :I :T :*
	# TODO: skin color
	# TODO: cat ears, hats etc.
	# TODO: animation (maybe have an update method on these objects? or have higher level descriptors?)


emojis = (make_random_emoji() for [1..12])

t = 0
animate ->
	
	{width: w, height: h} = canvas
	t += 0.1
	
	ctx.clearRect 0, 0, w, h
	
	x = 0
	y = 0
	per_row = 3
	size = 150
	grid_size = size * 1.1 + 10
	rows = emojis.length // per_row
	# TODO: scale down to fit all emojis on screen
	# or even just change the canvas size and make the page scrollable
	# or even just add multiple canvases to the DOM
	ctx.save()
	ctx.translate(
		(w - grid_size * per_row) / 2
		(h - grid_size * rows / 2) / 2
	)
	for emoji, i in emojis
		draw_emoji(emoji, x * grid_size, y * grid_size, size)
		x += 1
		if x > per_row
			x = 0
			y += 1
	
	ctx.restore()
