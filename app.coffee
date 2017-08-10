
draw_emoji = (ctx, {eyes, mouth}, x, y, diameter)->
	
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
			# TODO: mesh with the curve of the mouth
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
		switch eye.type
			when "open"
				ctx.arc(x, y, radius/6, 0, TAU)
				ctx.fillStyle = "black"
				ctx.fill()
			when "wink"
				ctx.moveTo(x - radius/7, y)
				ctx.lineTo(x + radius/7, y)
				ctx.strokeStyle = "black"
				ctx.lineWidth = 10
				ctx.stroke()
	
	if eyes?.left
		draw_eye(eyes.left, -radius*0.4, -radius/3)
	if eyes?.right
		draw_eye(eyes.right, +radius*0.4, -radius/3)
	
	
	ctx.restore()


make_random_emoji = ->
	random_eye = ->
		type: if Math.random() < 0.3 then "wink" else "open"
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
			else 0 # for dat.gui's benefit
		# TODO: width & offset or whatever
		# TODO: :O :o :3 :S :P :9 :F :C :c :B :] :J :I :T :*
	# TODO: skin color
	# TODO: cat ears, hats etc.
	# TODO: animation (maybe have an update method on these objects? or have higher level descriptors?)


emojis = (make_random_emoji() for [1..12])

emojis_container = document.getElementById("emojis")

for emoji in emojis
	canvas = document.createElement("canvas")
	ctx = canvas.getContext("2d")
	
	canvas.classList.add("emoji")
	emojis_container.appendChild(canvas)

	size = 150
	spacing = size * 0.1 + 5
	canvas.width = size + spacing
	canvas.height = size + spacing
	
	draw_emoji(ctx, emoji, canvas.width/2, canvas.height/2, size)
	
gui = new dat.GUI()
gui.add(emoji.mouth, 'smile', -1, +1).name('Smile')
gui.add(emoji.mouth, 'open').name('Open')
# gui.add(emoji.mouth, 'tongue', {
# 	"(Inside mouth)": 0,
# 	"Out downwards": 1,
# 	"Out upwards": -1,
# 	"Out downwards less": 0.5,
# 	"Out upwards less": -0.5,
# }) # doesn't work, it gives strings
# gui.add(emoji.mouth, 'tongue', {min: -1, max: 1, step: 0.5}) # doesn't work, it's treated as a dropdown
gui.add(emoji.mouth, 'tongue', -1, +1).step(0.5)
gui.add(emoji.eyes.left, 'type', {"Open": "open", "Wink": "wink"}).name('Left Eye')
gui.add(emoji.eyes.right, 'type', {"Open": "open", "Wink": "wink"}).name('Right Eye')


canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")

canvas.classList.add("emoji")
emojis_container.appendChild(canvas)

size = 150
spacing = size * 0.1 + 5
canvas.width = size + spacing
canvas.height = size + spacing

animate ->
	draw_emoji(ctx, emoji, canvas.width/2, canvas.height/2, size)

